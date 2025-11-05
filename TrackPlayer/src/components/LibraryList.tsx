import React from "react";
import { FlatList } from "react-native-gesture-handler";
import ArtistItem from "./artist/ArtistItem";
import TrackItem from "./tracks/TrackItem";
import { useAudioPlayerGlobal } from "../providers/PlayerContext";
import { useRouter } from "expo-router";
import { Track } from "../constants/types";
import PlayListItem from "./playlist/PlayListItem";

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

  const handleClickOnPlaylist = () => {};

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
