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
  if (!values.weight) {
    error.weight = "Weight is required";
    error.state = true;
  } else if (!values.height) {
    error.height = "Height is required";
    error.state = true;
  }
  return error;
};

const TodayUpdateModal = ({ state, setState }) => {
  const { profile: user, log } = useSelector(selectUser);

  const [error, setError] = useState({
    weight: "",
    height: "",
  });
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (log && user.height.length != 0) {
      setFormData({
        height: user.height[user.height.length - 1].value,
        weight: user.weight[user.height.length - 1].value,
      });
    }
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
      weight: "",
      height: "",
    });
    toast.loading("Updating with given details");
    const { weight, height } = formData;
    const bmi = BMI(height, weight).toFixed(2);
    userServices
      .todayUpdate({ weight, height, BMI: +bmi })
      .then((response) => {
        const message = response.data.message;
        toast.dismiss();
        toast.success(message);
        setState(false);
        profile(dispatch, userActions);
      })
      .catch((e) => {
        console.log(e);
        const message = e.response.data.message;
        toast.dismiss();
        return toast.error(message);
      });
  };

  return (
    <Dialog.Root open={state} onOpenChange={setState}>
      <Dialog.Trigger className="Button green1">
       Today update Form
        <RxReader />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Enter Today Details for update
          </Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>

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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodayUpdateModal;
