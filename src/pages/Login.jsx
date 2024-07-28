import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../components/Modal/LoginModel";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div style={{ visibility: "hidden" }}>
      <LoginModal />
    </div>
  );
};

export default Login;
