import { protectedInstance, instance } from "./instance";

const userServices = {
  register: async (data) => {
    return await instance.post(`/users`, { ...data });
  },
  Activate: async (key) => {
    return await instance.put(`/users/activate/${key}`);
  },
  login: async (email, password) => {
    return await instance.post(
      "/users/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  },
  logout: async () => {
    return protectedInstance.post("/users/logout");
  },
  checkAuth: async () => {
    // console.log(document.cookie)
    return await protectedInstance.get("/users/profile");
  },
  forgot: async (email) => {
    return await instance.put(`/users/forgot`, {
      email,
    });
  },
  verify: async (otp, email) => {
    return await instance.post(`/users/verify/`, {
      otp,
      email,
    });
  },
  reset: async (data) => {
    return await instance.put(`/users/reset`, {
      ...data,
    });
  },
  update: async (data) => {
    return await protectedInstance.put(`/users/update`, {
      ...data,
    });
  },
  todayUpdate: async (data) => {
    return await protectedInstance.put(`/users/update/today`, {
      ...data,
    });
  },
  todayCalUpdate: async (data) => { 
    return await protectedInstance.put(`/users/update/calories`, {
      ...data,
    });
  },
};

export default userServices;
