import api from "./api";

export const playlistService = {
  toggleInTrack: async (playlistId: string, trackId: string) => {
    const res = await api.post(
      `/playlist/toggleInTrack?playlistId=${playlistId}&trackId=${trackId}`
    );
    return res.data;
  },
  add: async (playlistName: string) => {
    const res = await api.post(`/playlist/add`, { playlistName: playlistName });

    return res.data;
  },
  findById: async (playlistId: string) => {
    const res = await api.get(`/playlist/findById/${playlistId}`);
    return res.data;
  }
};
