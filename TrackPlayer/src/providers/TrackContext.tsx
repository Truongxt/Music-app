import { Track } from "@/src/constants/types";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

type TrackState = {
  tracks: Track[];
};

type Action =
  | { type: "SET_TRACKS"; payload: Track[] }
  | { type: "ADD_TRACK"; payload: Track }
  | { type: "UPDATE_TRACK"; payload: Track }
  | { type: "REMOVE_TRACK"; payload: string }; // trackId

const initialState: TrackState = {
  tracks: [],
};

function trackReducer(state: TrackState, action: Action): TrackState {
  switch (action.type) {
    case "SET_TRACKS":
      return { ...state, tracks: action.payload };

    case "ADD_TRACK":
      return { ...state, tracks: [...state.tracks, action.payload] };

    case "UPDATE_TRACK":
      return {
        ...state,
        tracks: state.tracks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };

    case "REMOVE_TRACK":
      return {
        ...state,
        tracks: state.tracks.filter((t) => t._id !== action.payload),
      };

    default:
      return state;
  }
}

const TrackContext = createContext<{
  state: TrackState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(trackReducer, initialState);

  return (
    <TrackContext.Provider value={{ state, dispatch }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrack = () => {
  const ctx = useContext(TrackContext);
  if (!ctx) throw new Error("useTrack must be used inside TrackProvider");
  return {
    tracks: ctx.state.tracks,
    dispatch: ctx.dispatch,
  };
};
