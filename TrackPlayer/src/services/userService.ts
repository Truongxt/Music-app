import api from "./api";

export const userService = {
  getLikedTracks: async () => {
    const res = await api.get("/user/getLikedTracks");
    return res.data;
  },
  toggleLikeTrack: async (trackId: string) => {
    const res = await api.put("/user/toggleLikeTrack", { trackId });
    return res.data;
  },
  getUserLibrary: async () => {
    const res = await api.get("/user/myLibrary");
    return res.data;
  },
  toggleFollowAritst: async (artistId: string) => {
    const res = await api.put("/user/toggleFollowArtist", { artistId });
    return res.data;
  },
};
