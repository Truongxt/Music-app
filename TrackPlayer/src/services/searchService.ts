import api from "./api";

export const searchService = {
    searchAll: async (searchValue: string) => {
    try {
      const res = await api.get("/search/all", {
        params: { searchValue }, 
      });
      return res.data; 
    } catch (error: any) {
      console.error("Lỗi khi tìm kiếm:", error);
      throw error.response?.data || error;
    }
  },
}