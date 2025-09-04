import api from "./axiosConfig"; // axios instance with interceptors

// Fetch restaurants with pagination, sorting, and search
export const getAllRestaurant = async ({
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
  search = "",
} = {}) => {
  const response = await api.get("/restaurant/getAll", {
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

export const saveRestaurant = async (restaurantData) => {
  return await api.post("/restaurant/save", restaurantData);
};

export const getRestaurantById = async (id) => {
  return await api.get(`/restaurant/get/${id}`);
};

export const deleteRestaurantById = async (id) => {
  return await api.delete(`/restaurant/${id}/delete`);
};

export const updateRestaurantById = async (id, updatedData) => {
  return await api.put(`/restaurant/update?id=${id}`, updatedData);
};

export const getAssignedFood = async (restaurantId) => {
  return await api.get(`/restaurant/${restaurantId}/getAll`);
};

export const getAllOrders = async (restaurantId) => {
  return await api.get(`/restaurant/${restaurantId}/order/getAll`);
};