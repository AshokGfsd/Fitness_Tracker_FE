import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userActions } from "../features/user/userSlice";
import {
  fetchTodayFoods,
  fetchTodayGoals,
  fetchTodayExercises,
  fetchExercises,
  fetchFoods,
  fetchGoals,
  fetchSuggestion,
  fetchYourSuggestion,
  profile,
} from "../services/loader";
import { toast } from "react-toastify";
import TodayUpdateModal from "../components/Modal/TodayUpdate";
import { current } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

const Mainpage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const user = useSelector(selectUser);
  const exercises = user.todayExercises;
  const foods = user.todayFoods;
  const goals = user.todayGoals;

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
  useEffect(() => {
    userServices.todayCalUpdate({
      totalCaloriesBurned: totalCaloriesBurned,
      totalCaloriesConsumed: totalCaloriesConsumed,
      totalCaloriesGoal: totalCaloriesGoal,
      remainingCaloriestoGoal: totalCaloriesGoalRemaining,
    });
  }, [
    totalCaloriesBurned,
    totalCaloriesConsumed,
    totalCaloriesGoal,
    totalCaloriesGoalRemaining,
  ]);
  useEffect(() => {
    profile(dispatch, userActions);
  }, []);
  useEffect(() => {
    if (user.log) {
      toast.dismiss();
      fetchFoods(dispatch, userActions);
      fetchGoals(dispatch, userActions);
      fetchExercises(dispatch, userActions);
      fetchTodayFoods(dispatch, userActions);
      fetchTodayGoals(dispatch, userActions);
      fetchTodayExercises(dispatch, userActions);
      fetchSuggestion(dispatch, userActions);
      fetchYourSuggestion(dispatch, userActions);
    }
  }, [user.profile]);

  useEffect(() => {
    if (user.log) {
      console.log(user)
      if (
        user.profile.BMI.length == 0 ||
        new Date().getDate() !==
          new Date(user.profile.BMI[user.profile.BMI.length - 1].date).getDate()
      ) {
        setState(true);
      }
    }
  }, [user.profile, state]);
  return (
    <Layout>
      {state ? (
        <TodayUpdateModal state={state} setState={setState} />
      ) : (
        <Outlet />
      )}
    </Layout>
  );
};

export default Mainpage;
