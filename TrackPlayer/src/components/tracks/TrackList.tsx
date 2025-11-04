import { Track } from "@/src/constants/types";
import { useAudioPlayerGlobal } from "@/src/providers/PlayerContext";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import TrackItem from "./TrackItem";

type TrackListProps = {
  tracks: Track[];
};

export const TrackList = ({ tracks }: TrackListProps) => {
  const { playTrack } = useAudioPlayerGlobal();
  const router = useRouter();

  const handleTrackSelected = async (track: Track, index: number) => {
    await playTrack(tracks, index);
    router.push("/player");
  };

  return (
    <FlatList
      data={tracks}
      renderItem={({ item, index }) => (
        <TrackItem
          track={item}
          onTrackSelect={() => handleTrackSelected(item, index)}
        />
      )}
    />
  );
};
