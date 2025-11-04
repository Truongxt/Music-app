import api from "./api";

export const albumService = {
    findById: async (id: string) => {
        const res = await api.get(`/albums/${id}`);
        return res.data;
    },
    findByAritst: async (id: string) => {
        const res = await api.get(`/albums/findByArtist/${id}`);
        return res.data;
    },findAll: async () =>{
        const res = await api.get(`/albums`);
        return res.data;
    }
}