import "./Modal.css";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import userServices from "../../services/userServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const validate = (values) => {
  let error = { state: false };
  const password = values.password;
  if (!values.email) {
    error.email = "Email is required";
    error.state = true;
  } else if (!password) {
    error.password = "*Required";
    error.state = true;
  }
  return error;
};

const LoginModal = () => {
  const [visibility, setVisibility] = useState({
    password: false,
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
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
      email: "",
      password: "",
    });
    toast.loading("Please Wait...");
    const { email, password } = formData;
    userServices
      .login(email, password)
      .then((response) => {
        const { message, token } = response.data;
        document.cookie = `token=${token}`;
        toast.dismiss();
        toast.success(message);
        navigate("/user");
      })
      .catch((e) => {
        const message = e.response.data.message;
        toast.dismiss();
        return toast.error(message);
      });

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Trigger>Login</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Log in</Dialog.Title>
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
          <center>
            <Link className="Button green" to={"/forgot"}>
              Forgot Password
            </Link>
          </center>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={submitHandler}>
                Log in
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

export default LoginModal;
