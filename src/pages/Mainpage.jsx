import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userActions } from "../features/user/userSlice";
import {
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

const Mainpage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    profile(dispatch, userActions);
  }, []);
  useEffect(() => {
    if (user.log) {
      toast.dismiss();
      fetchFoods(dispatch, userActions);
      fetchGoals(dispatch, userActions);
      fetchExercises(dispatch, userActions);
      fetchSuggestion(dispatch, userActions);
      fetchYourSuggestion(dispatch, userActions);
    }
  }, [user.profile]);

  useEffect(() => {
    if (
      user.log &&
      new Date().getDate() !==
        new Date(user.profile.BMI[user.profile.BMI.length - 1].date).getDate()
    ) {
      setState(true);
    }
  }, [user.profile, state]);
  return (
    <Layout>
      <TodayUpdateModal state={state} setState={setState} />
      <Outlet />
    </Layout>
  );
};

export default Mainpage;
