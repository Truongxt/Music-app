import api from "./api";
type CreateCommentParams = {
  content: string;
  track?: string;
  post?: string;
  responseFor?: string;
};
export const commentService = {
  findByTrack: async (id: string) => {
    const res = await api.get(`/comments/findByTrack/${id}`);
    return res.data;
  },
  findByPost: async (id: string) => {
    const res = await api.get(`/comments/findByPost/${id}`);
    return res.data;
  },
  postComment: async (params: CreateCommentParams) => {
    try {
      const res = await api.post("/comments/", params);
      return res.data;
    } catch (error: any) {
      console.error("Error posting comment:", error.response?.data || error);
      throw error;
    }
  },
};
