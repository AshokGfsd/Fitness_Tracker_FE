import { protectedInstance, instance } from "./instance";

const goalServices = {
  get: async () => {
    return await protectedInstance.get(`/goals`);
  },
  post: async ({
    _id,
    goalName,
    goalDescription,
    targetDate,
    targetCaloriesValue,
    status,
  }) => {
    return await protectedInstance.post(`/goals`, {
      _id,
      goalName,
      goalDescription,
      targetDate,
      targetCaloriesValue,
      status,
    });
  },
  delete: async (id) => {
    return await protectedInstance.delete(`/goals/${id}`);
  },
  update: async (data) => {
    return await protectedInstance.put(`/goals/${data._id}`, data);
  },
};

export default goalServices;
