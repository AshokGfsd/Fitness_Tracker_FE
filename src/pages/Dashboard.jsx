import "./Dashboard.css";
import { LineChart } from "@mui/x-charts";
import { AiOutlineFire } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userActions, selectUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const exercises = user.exercises;
  const foods = user.foods;
  const goals = user.goals;
  const loading = user.loading;
  const navigate = useNavigate();
  const [data, setData] = useState({
    bmi: [],
    weight: [],
    height: [],
    date: [1, 2, 3, 4, 5, 6, 7],
  });

  useEffect(() => {
    toast.dismiss();
  }, []);
  const check = (data) => {
    if (data.length < 7) {
      const length = data.length;
      for (let i = 0; i < 7 - length; i++) {
        data.splice(0, 0, data[0]);
      }
    }
    return data;
  };
  useEffect(() => {
    if (user.log) {
      console.log(user.profile);
      const date = [];
      for (let i = 7; i > 0; i--) {
        const today = new Date();
        let mm = today.getMonth() + 1;
        let dd = today.getDate() - i;
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        date.push(dd + "/" + mm);
      }
      const bmi = check(user.profile.BMI.map((d) => d.value));
      const weight = check(user.profile.weight.map((d) => d.value));
      const height = check(user.profile.height.map((d) => d.value));

      setData({ bmi, weight, height, date });
    }
  }, [user.profile]);
  console.log(data);
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
      status === "Achieved" ? acc : acc + targetCaloriesValue,
    0
  );

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
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
      <LineChart
        xAxis={[{ scaleType: "point", data: data.date }]}
        series={[
          {
            data: data.bmi,
            label: "BMI",
            color: "red",
          },
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
        width={500}
        height={300}
      />
    </div>
  );
};

export default Dashboard;
