import axios from "axios";

const baseURL = "https://fitness-tracker-be-s2gj.onrender.com"||"https://fitness-tracker-be-s2gj.onrender.com/";

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
