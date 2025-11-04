import api from "@/src/services/api";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../constants/types";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;

  likedTrackIds: string[];
  toggleLikeTrack: (trackId: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  likedTrackIds: [],
  toggleLikeTrack: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>([]);

  useEffect(() => {
    const loadSession = async () => {
      const token = await SecureStore.getItemAsync("token");
      const userData = await SecureStore.getItemAsync("user");
      if (token && userData) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const u = JSON.parse(userData);
        setUser(u);
        setLikedTrackIds(u.likedTracks || []); // chỉ init 1 lần từ user DB
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await api.post("/auth/login", { username, password });
    const { token, user } = res.data;

    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("user", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    setLikedTrackIds(user.likedTracks || []);
  };

  const register = async (username: string, password: string, displayName?: string) => {
    await api.post("/auth/register", { username, password, displayName });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    setUser(null);
    setLikedTrackIds([]);
  };

  const toggleLikeTrack = (trackId: string) => {
    setLikedTrackIds(prev =>
      prev.includes(trackId)
        ? prev.filter(x => x !== trackId)
        : [...prev, trackId]
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        likedTrackIds,
        toggleLikeTrack
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
