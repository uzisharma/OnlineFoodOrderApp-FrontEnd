import api from "./axiosConfig";


export const saveFood = async (foodData)=>{
    return await api.post("/food/save", foodData);
};


export const getAllFood = async ({
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
  search = "",
} = {}) => {
  const response = await api.get("/food/getAll", {
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

export const deleteFoodById = async (id) => {
  return await api.delete(`/food/${id}/delete`);
};

export const updateFoodById = async (id, updatedFoodData) => {
  return api.put(`/food/update?id=${id}`, updatedFoodData);
};