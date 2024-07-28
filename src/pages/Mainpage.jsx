import React, { useEffect } from "react";
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

const Mainpage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // console.log(user);
  useEffect(() => {
    profile(dispatch, userActions);
  }, []);
  useEffect(() => {
    if (user.profile.userName) {
      fetchFoods(dispatch, userActions);
      fetchGoals(dispatch, userActions);
      fetchExercises(dispatch, userActions);
      fetchSuggestion(dispatch, userActions);
      fetchYourSuggestion(dispatch, userActions);
    }
  }, [user.profile]);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Mainpage;
