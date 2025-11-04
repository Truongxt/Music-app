import api from "./api";

export const trackService = {
  getAll: async () => {
    const res = await api.get("/tracks");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get(`/tracks/${id}`);
    return res.data;
  },
  getByArtist: async (id: string) => {
    const res = await api.get(`/tracks/findByArtist/${id}`);
    return res.data;
  },
  
};
