import "./Dashboard.css";
import { LineChart } from "@mui/x-charts";
import { AiOutlineFire } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userActions, selectUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodayUpdateModal from "../components/Modal/TodayUpdate";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const [state, setState] = useState(false);
  const exercises = user.exercises;
  const foods = user.foods;
  const goals = user.goals;
  const todayExercises = user.todayExercises;
  const todayFoods = user.todayFoods;
  const todayGoals = user.todayGoals;
  const loading = user.loading;
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Week");
  const [data, setData] = useState({
    bmi: [],
    weight: [],
    height: [],
    totalCaloriesBurned: [],
    totalCaloriesConsumed: [],
    totalCaloriesGoal: [],
    remainingCaloriestoGoal: [],
    date: [1, 2, 3, 4, 5, 6, 7],
  });

  useEffect(() => {
    toast.dismiss();
  }, []);
  const check = (data) => {
    if (filter == "Week") {
      if (data.length == 6) {
        return data;
      } else if (data.length < 7) {
        const length = data.length;
        for (let i = 0; i < 7 - length; i++) {
          data.splice(0, 0, data[0]);
        }
      } else if (data.length >= 7) {
        const length = data.length;
        for (let i = 0; i < length - 7; i++) {
          data.splice(0, 1);
        }
      }
    } else if (filter == "Month") {
      if (data.length == 30) {
        return data;
      } else if (data.length < 30) {
        const length = data.length;
        for (let i = 0; i < 30 - length; i++) {
          data.splice(0, 0, data[0]);
        }
      } else if (data.length >= 30) {
        const length = data.length;
        for (let i = 0; i < length - 30; i++) {
          data.splice(0, 1);
        }
      }
    }
    return data;
  };
  useEffect(() => {
    if (user.log) {
      // console.log(user.profile);
      const date = [];
      if (filter == "Week") {
        for (let i = 6; i > -1; i--) {
          const today = new Date(
            user.profile.BMI[user.profile.BMI.length - 1].date
          );
          let mm = today.getMonth() + 1;
          let dd = today.getDate() - i;
          if (dd < 10) dd = "0" + dd;
          if (mm < 10) mm = "0" + mm;
          date.push(dd + "/" + mm);
        }
      } else if ("Month") {
        for (let i = 30; i > -1; i--) {
          const today = new Date();
          if (today.getDate() - i == 0) {
            const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
            const ntoday = new Date(lastDay);
            var dd = ntoday.getDate();
            var mm = ntoday.getMonth() + 1;
            if (dd < 10) dd = "0" + dd;
            if (mm < 10) mm = "0" + mm;
            date.push(dd + "/" + mm);
          } else if (today.getDate() - i < 0) {
            const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
            const ntoday = new Date(lastDay);
            var dd = ntoday.getDate() + today.getDate() - i;
            var mm = ntoday.getMonth() + 1;
            if (dd < 10) dd = "0" + dd;
            if (mm < 10) mm = "0" + mm;
            date.push(dd + "/" + mm);
          } else {
            var dd = today.getDate() - i;
            var mm = today.getMonth() + 1;
            if (dd < 10) dd = "0" + dd;
            if (mm < 10) mm = "0" + mm;
            date.push(dd + "/" + mm);
          }
        }
      }
      const bmi = check(user.profile.BMI.map((d) => d.value));
      const weight = check(user.profile.weight.map((d) => d.value));
      const height = check(user.profile.height.map((d) => d.value));
      const totalCaloriesBurned = check(
        user.profile.calories.map((d) => d.totalCaloriesBurned)
      );
      const totalCaloriesConsumed = check(
        user.profile.calories.map((d) => d.totalCaloriesConsumed)
      );
      const totalCaloriesGoal = check(
        user.profile.calories.map((d) => d.totalCaloriesGoal)
      );
      const remainingCaloriestoGoal = check(
        user.profile.calories.map((d) => d.remainingCaloriestoGoal)
      );
      setData({
        bmi,
        weight,
        height,
        date,
        totalCaloriesBurned,
        totalCaloriesConsumed,
        totalCaloriesGoal,
        remainingCaloriestoGoal,
      });
    }
  }, [user, filter]);
  const totalCaloriesBurned = exercises.reduce(
    (acc, { caloriesBurnt }) => acc + caloriesBurnt,
    0
  );
  const totalCaloriesConsumed = foods.reduce(
    (acc, { calories }) => acc + calories,
    0
  );
  const totalCaloriesGoal = goals.reduce(
    (acc, { targetCaloriesValue }) => acc + targetCaloriesValue,
    0
  );
  const totalCaloriesGoalRemaining = goals.reduce(
    (acc, { targetCaloriesValue, status }) =>
      status === "Week" ? acc : acc + targetCaloriesValue,
    0
  );
  const todayTotalCaloriesBurned = todayExercises.reduce(
    (acc, { caloriesBurnt }) => acc + caloriesBurnt,
    0
  );
  const todayTotalCaloriesConsumed = todayFoods.reduce(
    (acc, { calories }) => acc + calories,
    0
  );
  const todayTotalCaloriesGoal = todayGoals.reduce(
    (acc, { targetCaloriesValue }) => acc + targetCaloriesValue,
    0
  );
  const todayTotalCaloriesGoalRemaining = todayGoals.reduce(
    (acc, { targetCaloriesValue, status }) =>
      status === "Week" ? acc : acc + targetCaloriesValue,
    0
  );

  return (
    <div className="dashboard">
      <h1>
        Dashboard <TodayUpdateModal state={state} setState={setState} />
      </h1>
      <h3>Today calories</h3>
      <div className="dashboard__container">
        <div className="dashboard__card" data-loading={loading}>
          <p>
            <AiOutlineFire />
            {todayTotalCaloriesBurned}
          </p>
          <h4>Today Calories Burned</h4>
          <img src="dashboardCardBg.svg" />
        </div>
        <div className="dashboard__card" data-loading={loading}>
          <p>
            <AiOutlineFire />
            {todayTotalCaloriesConsumed}
          </p>
          <h4>Today Calories Consumed</h4>
          <img src="dashboardCardBg.svg" />
        </div>
        <div className="dashboard__card" data-loading={loading}>
          <p>
            <AiOutlineFire />
            {todayTotalCaloriesGoal}
          </p>
          <h4>Today Calories Goal</h4>
          <img src="dashboardCardBg.svg" />
        </div>
        <div className="dashboard__card" data-loading={loading}>
          <p>
            <AiOutlineFire />
            {todayTotalCaloriesGoalRemaining}
          </p>
          <h4>Today Remaining Calories to Goal</h4>
          <img src="dashboardCardBg.svg" />
        </div>
      </div>
      <h3>Total colories</h3>
      <div className="dashboard__container">
        <div className="dashboard__card" data-loading={loading}>
          <p>
            <AiOutlineFire />
            {totalCaloriesBurned}
          </p>
          <h4>Total Calories Burned</h4>
          <img src="dashboardCardBg.svg" />
        </div>
        <div className="dashboard__card" data-loading={loading}>
          <p>
            <AiOutlineFire />
            {totalCaloriesConsumed}
          </p>
          <h4>Total Calories Consumed</h4>
          <img src="dashboardCardBg.svg" />
        </div>
        <div className="dashboard__card" data-loading={loading}>
          <p>
            <AiOutlineFire />
            {totalCaloriesGoal}
          </p>
          <h4>Total Calories Goal</h4>
          <img src="dashboardCardBg.svg" />
        </div>
        <div className="dashboard__card" data-loading={loading}>
          <p>
            <AiOutlineFire />
            {totalCaloriesGoalRemaining}
          </p>
          <h4>Remaining Calories to Goal</h4>
          <img src="dashboardCardBg.svg" />
        </div>
      </div>
      <fieldset className="filter">
        <label className="Label" htmlFor="status">
          Status
        </label>
        <select
          className="Input"
          name="status"
          style={{ backgroundColor: "rgb(31,33,37)" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
      </fieldset>
      <div className="dashboard_chart_container">
        <div className="dashboard__chart" data-loading={loading}>
          <LineChart
            xAxis={[{ scaleType: "point", data: data.date }]}
            yAxis={[
              { max: data.bmi[0] + 5, min: data.bmi[0] - 5, label: "VALUE" },
            ]}
            slotProps={{
              loadingOverlay: { message: "Loading...." },
            }}
            series={[
              {
                data: data.bmi,
                label: "BMI",
                color:
                  data.bmi[data.bmi.length - 1] > 18.4 &&
                  data.bmi[data.bmi.length - 1] < 24.9
                    ? "rgba(75, 185, 108, 0.808)"
                    : "rgb(199, 14, 14, 0.945)",
              },
            ]}
            height={300}
          />
        </div>
        <div className="dashboard__chart" data-loading={loading}>
          <LineChart
            xAxis={[{ scaleType: "point", data: data.date }]}
            yAxis={[{ label: "VALUE" }]}
            slotProps={{
              loadingOverlay: { message: "Loading...." },
            }}
            series={[
              {
                data: data.height,
                label: "Height",
                color: "blue",
              },
              {
                data: data.weight,
                label: "Weight",
                color: "green",
              },
            ]}
            height={300}
          />
        </div>
        <div className="dashboard__chart" data-loading={loading}>
          <LineChart
            xAxis={[{ scaleType: "point", data: data.date }]}
            slotProps={{
              loadingOverlay: { message: "Loading...." },
            }}
            yAxis={[
              {
                max: data.totalCaloriesConsumed[0] + 100,
                min: data.totalCaloriesConsumed[0] - 100,
                label: "VALUE",
              },
            ]}
            series={[
              {
                data: data.totalCaloriesConsumed,
                label: "Total Calories Consumed",
                color: "lightgreen",
              },
              {
                data: data.totalCaloriesBurned,
                label: "Total Calories Burned",
                color: "red",
              },
            ]}
            height={300}
          />
        </div>
        <div className="dashboard__chart" data-loading={loading}>
          <LineChart
            xAxis={[{ scaleType: "point", data: data.date }]}
            slotProps={{
              loadingOverlay: { message: "Loading...." },
            }}
            yAxis={[
              {
                max: data.totalCaloriesGoal[0] + 100,
                min: data.totalCaloriesGoal[0] - 100,
                label: "VALUE",
              },
            ]}
            series={[
              {
                data: data.totalCaloriesGoal,
                label: "Total Calories Goal",
                color: "blue",
              },
              {
                data: data.remainingCaloriestoGoal,
                label: "Remaining Calories to Goal",
                color: "green",
              },
            ]}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
