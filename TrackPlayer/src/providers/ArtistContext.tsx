import React, { createContext, useContext, useReducer, ReactNode } from "react"
import { Artist } from "@/src/constants/types"

type State = {
  artists: Artist[]
}

type Action =
  | { type: "SET_ARTISTS"; payload: Artist[] }
  | { type: "ADD_ARTIST"; payload: Artist }
  | { type: "UPDATE_ARTIST"; payload: Artist } // replace full — usually from backend after edit
  | { type: "DELETE_ARTIST"; payload: string }

const ArtistContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: { artists: [] },
  dispatch: () => {}
})

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ARTISTS":
      return { ...state, artists: action.payload }

    case "ADD_ARTIST":
      return { ...state, artists: [action.payload, ...state.artists] }

    case "UPDATE_ARTIST":
      return {
        ...state,
        artists: state.artists.map(a => a._id === action.payload._id ? action.payload : a)
      }

    case "DELETE_ARTIST":
      return {
        ...state,
        artists: state.artists.filter(a => a._id !== action.payload)
      }

    default:
      return state
  }
}

export function ArtistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { artists: [] })
  return (
    <ArtistContext.Provider value={{ state, dispatch }}>
      {children}
    </ArtistContext.Provider>
  )
}

export const useArtist = () => useContext(ArtistContext)
