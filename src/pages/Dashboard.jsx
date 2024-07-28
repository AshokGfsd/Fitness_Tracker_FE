import "./Dashboard.css";
import { AiOutlineFire } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userActions, selectUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const exercises = user.exercises;
  const foods = user.foods;
  const goals = user.goals;
  const loading = user.loading;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.log) {
      toast.info("Please log-in");
      navigate("/user");
    }
  }, []);
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
    </div>
  );
};

export default Dashboard;
