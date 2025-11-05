import api from "@/src/services/api";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../constants/types";
import { userService } from "../services/userService";
import { useArtist } from "./ArtistContext";
import { usePlaylist } from "./PlayListContext";
import { useTrack } from "./TrackContext";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    displayName?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { state, dispatch: dispatchArtist } = useArtist();
  const { dispatch: dispatchPlaylist } = usePlaylist();
  const { dispatch: dispatchTrack } = useTrack();

  useEffect(() => {
    const loadSession = async () => {
      const token = await SecureStore.getItemAsync("token");
      const userData = await SecureStore.getItemAsync("user");

      if (token && userData) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const u = JSON.parse(userData);
        setUser(u);

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

  };

  const register = async (
    username: string,
    password: string,
    displayName?: string
  ) => {
    await api.post("/auth/register", { username, password, displayName });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    setUser(null);

    dispatchArtist({ type: "SET_ARTISTS", payload: [] });
    dispatchPlaylist({ type: "SET_PLAYLISTS", payload: [] });
    dispatchTrack({ type: "SET_TRACKS", payload: [] });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
