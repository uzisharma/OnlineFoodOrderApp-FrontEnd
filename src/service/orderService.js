import api from "./axiosConfig";

export const getAllOrder = async ({
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
  search = "",
} = {}) => {
  const response = await api.get("/place-order/getAll", {
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

export const deleteOrderById = async (id) => {
  return await api.delete(`/place-order/${id}/delete`);
};

export const updateOrderById = async (id, updatedFoodData) => {
  return api.put(`/place-order/update?id=${id}`, updatedFoodData);
};
