import { useDispatch, useSelector } from "react-redux";
import "./Goals.css";
import { selectUser, userActions } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
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
  const { profile: user, log } = useSelector(selectUser);
  const [logout, setLogout] = useState(false);
  const [state, setState] = useState(false);
  const [aim, setAim] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    profile(dispatch, userActions);
  }, []);
  useEffect(() => {
    if (log && user.BMI.length != 0) {
      setAim(BMICheck(user.BMI[user.BMI.length - 1].value));
    }
  }, [log]);
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
      <table cellPadding={7.5}>
        <tr>
          <td>Age</td>
          <td>:</td>
          <td>{user.age}</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>:</td>
          <td>
            {user.height.length != 0 &&
              user.height[user.height.length - 1].value}
          </td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>:</td>
          <td>
            {user.weight.length != 0 &&
              user.weight[user.weight.length - 1].value}
          </td>
        </tr>
        <tr>
          <td>BMI</td>
          <td>:</td>
          <td>{user.BMI.length != 0 && user.BMI[user.BMI.length - 1].value}</td>
        </tr>
        <tr>
          <td>STAGE</td>
          <td>:</td>
          <td>
            <span style={{ backgroundColor: aim.color }}>
              <RxAvatar />
              {aim.Name}
            </span>
          </td>
        </tr>
      </table>
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
