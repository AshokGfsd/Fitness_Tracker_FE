import axios from "axios";

const baseURL = "http://127.0.0.1:4444";
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
