import { protectedInstance } from "./instance";

const suggestionServices = {
  get: async () => {
    return await protectedInstance.get(`/suggestions/user`);
  },
  getYour: async () => {
    return await protectedInstance.get(`/suggestions`);
  },
  post: async (data) => {
    return await protectedInstance.post(`/suggestions`, {
      ...data,
    });
  },
  delete: async (id) => {
    return await protectedInstance.delete(`/suggestions/${id}`);
  },
  update: async (data) => {
    return await protectedInstance.put(`/suggestions/${data._id}`,data);
  },
  deleteByUser: async (id) => {
    return await protectedInstance.delete(`/suggestions/user/${id}`);
  },
};

export default suggestionServices;
