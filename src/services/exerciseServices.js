import { protectedInstance, instance } from "./instance";

const exerciseServices = {
  get: async () => {
    return await protectedInstance.get(`/exercises`);
  },
  getToday: async () => {
    return await protectedInstance.get(`/exercises/today`);
  },
  post: async (data) => {
    return await protectedInstance.post(`/exercises`, {
      ...data,
    });
  },
  delete: async (id) => {
    return await protectedInstance.delete(`/exercises/${id}`);
  },
  update: async (data) => {
    return await protectedInstance.put(`/exercises/${data._id}`, data);
  },
};

export default exerciseServices;
