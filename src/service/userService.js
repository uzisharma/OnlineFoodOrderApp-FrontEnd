import api from "./axiosConfig";

export const saveUser = async (userData) => {
  return await api.post("/user/save", userData);
};

export const getAllUser = async () => {
  return await api.get("/user/getAll");
};
