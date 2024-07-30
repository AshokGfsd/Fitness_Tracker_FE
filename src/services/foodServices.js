import { protectedInstance, instance } from "./instance";

const foodServices = {
  get: async () => {
    return await protectedInstance.get(`/foods`);
  },
  getToday: async () => {
    return await protectedInstance.get(`/foods/today`);
  },
  post: async ({ _id, foodName, calories, protein, carbohydrates, fat }) => {
    return await protectedInstance.post(`/foods`, {
      _id,
      foodName,
      calories,
      protein,
      carbohydrates,
      fat,
    });
  },
  delete: async (id) => {
    return await protectedInstance.delete(`/foods/${id}`);
  },
  update: async (data) => {
    return await protectedInstance.put(`/foods/${data._id}`, data);
  },
};

export default foodServices;
