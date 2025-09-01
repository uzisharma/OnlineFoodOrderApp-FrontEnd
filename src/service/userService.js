import api from "./axiosConfig";

export const saveUser = async (userData) => {
  return await api.post("/user/save", userData);
};

export const getAllUser = async ({
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
  search = "",
} = {}) => {
  const response = await api.get("/user/getAll", {
    params: {
      page,
      size,
      sortBy,
      sortDir,
      search,
    },
  });
  return response.data;
};

export const deleteUserById = async (id) => {
  return await api.delete(`/user/${id}/delete`);
};

export const updateUserById = async (id, updatedUserData) => {
  return api.put(`/user/update?id=${id}`, updatedUserData);
};
