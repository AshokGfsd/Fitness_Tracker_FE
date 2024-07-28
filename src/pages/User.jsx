import { useDispatch, useSelector } from "react-redux";
import "./Goals.css";
import { selectUser, userActions } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoutModal from "./../components/Modal/LogoutModel";
import { profile } from "../services/loader";
import UserModal from "../components/Modal/UserModel";
import { RxAvatar } from "react-icons/rx";
import { toast } from "react-toastify";

const BMICheck = (BMI) => {
  if (BMI < 18.5) {
    return {
      color: "#ffc400",
      Name: "Under weight",
      Goal: "Gain weight (muscle mass)",
      DailyCalorieIntake: " 2500-3000 calories",
    };
  } else if (18.5 < BMI && BMI <= 24.9) {
    return {
      color: "#00ff15",
      Name: "Normal weight",
      Goal: "Maintain weight",
      DailyCalorieIntake: "2000-2500 calories",
    };
  } else if (25 < BMI && BMI <= 29.9) {
    return {
      color: "#b14848",
      Name: "Over weight",
      Goal: "Lose weight (fat mass)",
      DailyCalorieIntake: "1500-2000 calories",
    };
  } else if (BMI >= 30) {
    return {
      color: "#ff0000",
      Name: "Obese ",
      Goal: "Lose weight (fat mass)",
      DailyCalorieIntake: "1200-1500 calories",
    };
  }
  return { color: "white" };
};
const User = () => {
  const { profile: user } = useSelector(selectUser);
  const [logout, setLogout] = useState(false);
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const aim = BMICheck(user.BMI);
  useEffect(() => {
    profile(dispatch, userActions);
    if (!user.age) {
      setState(true);
    }
  }, [state]);
  useEffect(() => {
    if (user.age) {
      toast.dismiss();
    }
  }, [user]);
  return user.userName ? (
    <div className="">
      <h1>
        Hi {user.userName} <LogoutModal state={logout} setState={setLogout} />
      </h1>
      <div className="">
        Please Fill this form <UserModal state={state} setState={setState} />
        <br />
        Get more features You can also use this form for edit
      </div>
      <h1>User Details</h1>
      <div>
        <h2 style={{ display: "inline-block" }}>Age: </h2>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3 style={{ display: "inline-block" }}>{user.age} </h3>
      </div>
      <div>
        <h2 style={{ display: "inline-block" }}>Height: </h2>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3 style={{ display: "inline-block" }}>{user.height} </h3>
      </div>
      <div>
        <h2 style={{ display: "inline-block" }}>Weight: </h2>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3 style={{ display: "inline-block" }}>{user.weight} </h3>
      </div>
      <div>
        <h2 style={{ display: "inline-block" }}>BMI: </h2>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3 style={{ display: "inline-block" }}>{user.BMI} </h3>
      </div>
      <div>
        <h2 style={{ display: "inline-block" }}>STAGE: </h2>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3 style={{ display: "inline-block" }}>
          <span style={{ backgroundColor: aim.color }}>
            <RxAvatar />
            {aim.Name}
          </span>
        </h3>
      </div>
      <div>
        <h2 style={{ display: "inline-block" }}>AIM FOR YOU: </h2>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3 style={{ display: "inline-block" }}>{aim.Goal} </h3>
      </div>
    </div>
  ) : (
    <div className="">
      <h1>User</h1>
      <div className="">
        Please Login or signin To continue
        <br />
        Get more features
      </div>
      <Link className="Button green" to={"/login"}>
        Log in
      </Link>
      <Link className="Button green" to={"/signin"}>
        Sign in
      </Link>
    </div>
  );
};

export default User;
