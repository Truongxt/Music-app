import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Track } from "../constants/types";
import { useAudioPlayerGlobal } from "../providers/PlayerContext";
import ArtistItem from "./artist/ArtistItem";
import PlayListItem from "./playlist/PlayListItem";
import TrackItem from "./tracks/TrackItem";

type LibraryListProps = {
  library: any[];
};

export default function LibraryList({ library }: LibraryListProps) {
  const { playTrack } = useAudioPlayerGlobal();
  const router = useRouter();

  const handleTrackSelected = async (track: Track, index: number) => {
    await playTrack(track, index);
    router.push("/player");
  };

  const handleClickOnAritst = (id: string) => {
    router.push({ pathname: "/library/artist/[id]", params: { id } });
  };

  const handleClickOnPlaylist = (id: string) => {
    router.push(`/(drawer)/(tabs)/library/playlist/${id}`)
  };

  return (
    <FlatList
      data={library}
      renderItem={({ item, index }) => {
        switch (item.type) {
          case "artist":
            return (
              <ArtistItem handleOnSelect={handleClickOnAritst} artist={item} />
            );
          case "playlist":
            return (
              <PlayListItem onPress={handleClickOnPlaylist} playlist={item} />
            );
          case "track":
            return (
              <TrackItem
                onTrackSelect={() => handleTrackSelected(item, index)}
                track={item}
              />
            );
          default:
            return null;
        }
      }}
    />
  );
}
