import PlaylistPickerBottomSheet from "@/src/components/common/PlaylistPickerBottomSheet";
import { Playlist, Track } from "@/src/constants/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { usePlaylist } from "./PlayListContext";

type Ctx = {
  openPlaylistPicker: (track: Track) => void;
  closePlaylistPicker: () => void;
  selectedTrack?: Track;
  playlists: Playlist[];
};

const PlaylistPickerContext = createContext<Ctx>({
  openPlaylistPicker: () => {},
  closePlaylistPicker: () => {},
  playlists: [],
  selectedTrack: undefined,
});

export const usePlaylistPicker = () => useContext(PlaylistPickerContext);

export function PlaylistPickerProvider({ children }: { children: ReactNode }) {
  const [openFn, setOpenFn] = useState<() => void>(() => {});
  const [closeFn, setCloseFn] = useState<() => void>(() => {});
  const [selectedTrack, setSelectedTrack] = useState<Track>();

  const { state } = usePlaylist();
  const playlists = state.playlists;

  return (
    <PlaylistPickerContext.Provider
      value={{
        openPlaylistPicker: (track) => {
          setSelectedTrack(track);
          openFn();
        },
        closePlaylistPicker: () => closeFn(),
        selectedTrack,
        playlists,
      }}
    >
      {children}

      <PlaylistPickerBottomSheet
        onMount={({ open, close }) => {
          setOpenFn(() => open);
          setCloseFn(() => close);
        }}
      />
    </PlaylistPickerContext.Provider>
  );
}
