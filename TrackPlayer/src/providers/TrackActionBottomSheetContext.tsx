import TrackActionBottomSheet from "@/src/components/common/TrackActionBottomSheet";
import { Track } from "@/src/constants/types";
import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  openActionSheet: (track: Track) => void;
  closeActionSheet: () => void;
  selectedTrack: Track | null;
};

const TrackActionContext = createContext<Props>({
  openActionSheet: () => {},
  closeActionSheet: () => {},
  selectedTrack: null,
});

export const useTrackActionSheet = () => useContext(TrackActionContext);

export function TrackActionSheetProvider({ children }: { children: ReactNode }) {
  const [openFn, setOpenFn] = useState<() => void>(() => {});
  const [closeFn, setCloseFn] = useState<() => void>(() => {});
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <TrackActionContext.Provider
      value={{
        openActionSheet: (track) => {
          setSelectedTrack(track);
          openFn();
        },
        closeActionSheet: () => closeFn(),
        selectedTrack,
      }}
    >
      {children}

      <TrackActionBottomSheet
        onMount={({ open, close }) => {
          setOpenFn(() => open);
          setCloseFn(() => close);
        }}
      />
    </TrackActionContext.Provider>
  );
}
