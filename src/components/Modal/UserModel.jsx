import "./Modal.css";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2, RxReader } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userServices from "../../services/userServices";
import { selectUser, userActions } from "../../features/user/userSlice";
import { BMI, profile } from "../../services/loader";

const validate = (values) => {
  let error = {
    state: false,
  };
  if (!values.userName) {
    error.userName = "userName is required";
    error.state = true;
  } else if (!values.weight) {
    error.weight = "Weight is required";
    error.state = true;
  } else if (!values.height) {
    error.height = "Height is required";
    error.state = true;
  } else if (!values.gender) {
    error.gender = "Gender is required";
    error.state = true;
  }
  return error;
};

const UserModal = ({ state, setState }) => {
  const { profile: user } = useSelector(selectUser);

  const [error, setError] = useState({
    userName: "",
    gender: "",
    weight: "",
    height: "",
  });
  const [formData, setFormData] = useState({
    userName: "",
    DOB: "",
    gender: "male",
    weight: "",
    height: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const { userName, DOB, gender } = user;
    setFormData({
      userName,
      DOB,
      gender,
      height: user.height[user.height.length - 1].value,
      weight: user.weight[user.weight.length - 1].value,
    });
  }, [user]);
  const style = {
    color: "red",
    fontWeight: "italic",
  };
  const formDataHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    let error = validate(formData);
    if (error.state) {
      return setError(error);
    }
    setError({
      userName: "",
      gender: "",
      weight: "",
      height: "",
    });
    toast.loading("Updating with given details");
    const { DOB, gender, weight, height } = formData;
    const bmi = BMI(height, weight).toFixed(2);
    userServices
      .update({ DOB, gender, weight, height, BMI: +bmi })
      .then((response) => {
        const messDOB = response.data.messDOB;
        toast.dismiss();
        toast.success(messDOB);
        setState(false);
        profile(dispatch, userActions);
      })
      .catch((e) => {
        console.log(e, "error");
        const messDOB = e.response.data.messDOB;
        toast.dismiss();
        return toast.error(messDOB);
      });
  };

  return (
    <Dialog.Root open={state} onOpenChange={setState}>
      <Dialog.Trigger className="Button green">
        Form
        <RxReader />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Enter Details for update
          </Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="userName">
              User Name
            </label>
            <input
              className="Input"
              name="userName"
              value={formData.userName}
              onChange={(e) => formDataHandler(e)}
            />
          </fieldset>
          {error.userName && (
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="confirmPassword">
                Error
              </label>
              <div style={style}>{error.userName}</div>
            </fieldset>
          )}
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="DOB">
              DOB
            </label>
            <input
              className="Input"
              type="date"
              name="DOB"
              value={formData.DOB}
              max={150}
              onChange={(e) => formDataHandler(e)}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="weight">
              Weight
            </label>
            <input
              className="Input"
              maxLength={3}
              name="weight"
              value={formData.weight}
              onChange={(e) => formDataHandler(e)}
            />
          </fieldset>
          {error.weight && (
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="confirmPassword">
                Error
              </label>
              <div style={style}>{error.weight}</div>
            </fieldset>
          )}
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="height">
              Height
            </label>
            <input
              className="Input"
              maxLength={3}
              name="height"
              value={formData.height}
              onChange={(e) => formDataHandler(e)}
            />
          </fieldset>
          {error.height && (
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="confirmPassword">
                Error
              </label>
              <div style={style}>{error.height}</div>
            </fieldset>
          )}
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="gender">
              Gender
            </label>
            <select
              className="Input"
              name="gender"
              defaultValue={formData.gender}
              onChange={(e) => formDataHandler(e)}
              style={{ backgroundColor: "rgb(31,33,37)" }}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </fieldset>
          {error.gender && (
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="confirmPassword">
                Error
              </label>
              <div style={style}>{error.gender}</div>
            </fieldset>
          )}
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <button className="Button green" onClick={submitHandler}>
              Update
            </button>
          </div>
          <Dialog.Close asChild>
            <Link className="IconButton" to={"/user"}>
              <RxCross2 />
            </Link>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UserModal;
