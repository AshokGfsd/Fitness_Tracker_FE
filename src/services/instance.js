import axios from "axios";

const baseURL = "https://fitness-tracker-be-s2gj.onrender.com/";
// const baseURL = "https://fitness-tracker-server-86vy.onrender.com/fitness/";

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const protectedInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { instance, protectedInstance };
