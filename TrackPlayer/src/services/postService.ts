import api from "./api";

export const postSevice = {
  getAll: async () => {
    const res = await api.get("/posts");
    return res.data;
  },
};
