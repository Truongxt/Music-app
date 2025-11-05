import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Playlist, Track } from "@/src/constants/types";

type State = {
  playlists: Playlist[];
};

type Action =
  | { type: "SET_PLAYLISTS"; payload: Playlist[] }
  | { type: "ADD_PLAYLIST"; payload: Playlist }
  | { type: "DELETE_PLAYLIST"; payload: string }
  | { type: "RENAME_PLAYLIST"; payload: { id: string; name: string } }
  | { type: "ADD_TRACK"; payload: { playlistId: string; track: Track } }
  | { type: "REMOVE_TRACK"; payload: { playlistId: string; trackId: string } };

const PlaylistContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { playlists: [] },
  dispatch: () => {},
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PLAYLISTS":
      return { ...state, playlists: action.payload };

    case "ADD_PLAYLIST":
      return { ...state, playlists: [action.payload, ...state.playlists] };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter((p) => p._id !== action.payload),
      };

    case "RENAME_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p._id === action.payload.id ? { ...p, name: action.payload.name } : p
        ),
      };

    case "ADD_TRACK":
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p._id === action.payload.playlistId
            ? { ...p, tracks: [...p.tracks, action.payload.track] }
            : p
        ),
      };

    case "REMOVE_TRACK":
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p._id === action.payload.playlistId
            ? {
                ...p,
                tracks: p.tracks.filter(
                  (t) => t._id !== action.payload.trackId
                ),
              }
            : p
        ),
      };

    default:
      return state;
  }
}

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { playlists: [] });
  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylist = () => useContext(PlaylistContext);
