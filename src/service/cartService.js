// cartService.js
import axios from "axios";
import api from "./axiosConfig";

const API_URL = import.meta.env.VITE_API_URL; // your backend

export const addToCart = async (userId, restaurantId, foodId, quantity = 1) => {
  quantity === 0 ? (quantity = 1) : quantity;
  try {
    const response = await axios.post(`${API_URL}/cart/add`, {
      userId,
      restaurantId,
      foodId,
      quantity,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      console.error("Backend error:", err.response.data);
    } else {
      console.error("Unexpected error:", err.message);
    }
    throw err;
  }
};

export const getAllCart = async ({
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
  search = "",
} = {}) => {
  const response = await api.get("/cart/getAll", {
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

export const deleteCartById = async (id) => {
  return await api.delete(`/cart/${id}/delete`);
};

