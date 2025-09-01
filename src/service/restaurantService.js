import api from "./axiosConfig"; // axios instance (with interceptors)

export const fetchRestaurants = async (url) => {
  const response = await api.get(url);
  return response.data;
};

export const saveRestaurant = async (restaurantData) => {
  return await api.post("/restaurant/api/save", restaurantData);
};

export const deleteRestaurant = async (id) => {
  return await api.delete(`/restaurant/api/delete/${id}`);
};
