import api from "./axiosConfig";

export const saveAdmin = async (adminData) => {
  return await api.post("/admin/save", adminData);
};

export const getAllAdmin = async ({
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
  search = "",
} = {}) => {
  const response = await api.get("/admin/getAll", {
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

export const deleteAdminById = async (id) => {
  return await api.delete(`/admin/${id}/delete`);
};

export const updateAdminById = async (id, updatedAdminData) => {
  return api.put(`/admin/update?id=${id}`, updatedAdminData);
};
