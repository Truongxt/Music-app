import api from "./api";

export const artistService = {
    getPopularArtist: async () =>{
        const res = await api.get("/artists/popularArtist");
        return res.data;
    },
    findById: async (id: string) => {
        const res = await api.get(`/artists/${id}`);
        return res.data as Comment;
    }
}