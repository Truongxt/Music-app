import { Playlist, Track } from "@/src/constants/types";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

type State = {
  playlists: Playlist[];
};

type Action =
  | { type: "SET_PLAYLISTS"; payload: Playlist[] }
  | { type: "ADD_PLAYLIST"; payload: Playlist }
  | { type: "DELETE_PLAYLIST"; payload: string }
  | { type: "RENAME_PLAYLIST"; payload: { id: string; name: string } }
  | { type: "ADD_TRACK"; payload: { playlistId: string; track: Track } }
  | { type: "REMOVE_TRACK"; payload: { playlistId: string; trackId: string } }
  | { type: "UPDATE_PLAYLIST"; payload: Playlist };

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
      return {
        ...state,
        playlists: [...state.playlists, action.payload], 
      };
    case "UPDATE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p._id === action.payload._id ? action.payload : p
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
