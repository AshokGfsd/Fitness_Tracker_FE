import "./Modal.css";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import userServices from "../../services/userServices";

const validate = (values) => {
  let error = {
    state: false,
  };
  const lowercase = /[a-z]/;
  const uppercase = /[A-Z]/;
  const specialChar = /[~!@#$%^&*()_+{}:'"|<,>.]/;
  const password = values.password;
  const confirmPassword = values.confirmPassword;
  if (!password) {
    error.password = "*Required";
    error.state = true;
  } else if (password.length <= 8) {
    error.password = "Password must contain min length 8";
    error.state = true;
  } else if (!uppercase.test(password)) {
    error.password = "Password must contain one uppercase letter";
    error.state = true;
  } else if (!lowercase.test(password)) {
    error.password = "Password must contain one lowercase letter";
    error.state = true;
  } else if (!specialChar.test(password)) {
    error.password = "Password must contain one special character";
    error.state = true;
  } else if (password != confirmPassword) {
    error.confirmPassword = "Passwords don’t match.";
    error.state = true;
  }
  return error;
};

const ResetModal = () => {
  const { otp } = useParams();
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
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

  const submitHandler = (otp) => {
    let error = validate(formData);

    if (error.state) {
      return setError(error);
    }
    setError({
      password: "",
      confirmPassword: "",
    });
    toast.loading("Registering with given details");
    const { email, password } = formData;
    userServices
      .reset({ otp, email, password })
      .then((response) => {
        const message = response.data.message;
        toast.dismiss();
        toast.success(message);
        navigate("/user");
      })
      .catch((e) => {
        const message = e.response.data.message;
        toast.dismiss();
        return toast.error(message);
      });
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Trigger>RESET</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Reset password</Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="email">
              Email
            </label>
            <input
              className="Input"
              name="email"
              value={formData.email}
              onChange={(e) => formDataHandler(e)}
            />
            <span>&nbsp; &nbsp;&nbsp;&nbsp;</span>
          </fieldset>
          {error.email && (
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="confirmPassword">
                Error
              </label>
              <div style={style}>{error.email}</div>
            </fieldset>
          )}
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="password">
              Password
            </label>
            <input
              type={visibility.password ? "text" : "password"}
              className="Input"
              name="password"
              value={formData.password}
              onChange={(e) => formDataHandler(e)}
            />
            <span
              className="icon"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setVisibility({
                  password: !visibility.password,
                  confirmPassword: visibility.confirmPassword,
                });
              }}
            >
              {" "}
              {visibility.password ? "🙉" : "🙈"}
            </span>
          </fieldset>
          {error.password && (
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="confirmPassword">
                Error
              </label>
              <div style={style}>{error.password}</div>
            </fieldset>
          )}
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type={visibility.confirmPassword ? "text" : "password"}
              className="Input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => formDataHandler(e)}
            />
            <span
              className="icon"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setVisibility({
                  password: visibility.password,
                  confirmPassword: !visibility.confirmPassword,
                });
              }}
            >
              {" "}
              {visibility.confirmPassword ? "🙉" : "🙈"}
            </span>
          </fieldset>
          {error.confirmPassword && (
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="confirmPassword">
                Error
              </label>
              <div style={style}>{error.confirmPassword}</div>
            </fieldset>
          )}

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button
                className="Button green"
                onClick={() => submitHandler(otp)}
              >
                Reset
              </button>
            </Dialog.Close>
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

export default ResetModal;
