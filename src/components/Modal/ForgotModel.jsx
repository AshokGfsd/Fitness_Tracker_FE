import "./Modal.css";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import userServices from "../../services/userServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const validate = (values) => {
  let error = { state: false };
  if (!values) {
    error.email = "Email is required";
    error.state = true;
  }
  return error;
};

const ForgotModal = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    email: "",
  });
  const [state, setState] = useState(false);
  const [OTP, setOTP] = useState("");
  const [timer, setTimer] = useState(0);
  const style = {
    color: "red",
    fontWeight: "italic",
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (timer == 0) {
      return;
    }
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  }, [timer]);

  const otpHandler = () => {
    toast.loading("Please Wait...");
    userServices
      .verify(OTP, email)
      .then((response) => {
        const { message } = response.data;
        toast.dismiss();
        toast.success(message);
        navigate(`/reset/${OTP}`);
      })
      .catch((e) => {
        console.log(e);
        const message = e.response.data.message;
        toast.dismiss();
        return toast.error(message);
      });
  };
  const submitHandler = () => {
    let error = validate(email);
    if (error.state) {
      return setError(error);
    }
    setError({
      email: "",
    });
    if (timer != 0) {
      return toast.info(`Please Wait ${timer} Seconds`);
    }
    toast.loading("Please Wait...");
    userServices
      .forgot(email)
      .then((response) => {
        const { message } = response.data;
        toast.dismiss();
        toast.success(message);
        setState(true);
        setTimer(30);
      })
      .catch((e) => {
        console.log(e);
        const message = e.response.data.message;
        toast.dismiss();
        return toast.error(message);
      });
  };

  return state ? (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Forgot Password</Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="otp">
              OTP
            </label>
            <input
              className="Input"
              type="number"
              name="otp"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />
            <span>&nbsp; &nbsp;&nbsp;&nbsp;</span>
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "space-around",
            }}
          >
            <button className="Button green" onClick={submitHandler}>
              Resend OTP({timer})
            </button>
            <button className="Button green" onClick={otpHandler}>
              Verify
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
  ) : (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Forgot Password</Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="email">
              Email
            </label>
            <input
              className="Input"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={submitHandler}>
                send OTP
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

export default ForgotModal;
