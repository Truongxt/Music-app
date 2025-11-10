import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { Track } from "../constants/types";
import { useAudioPlayerGlobal } from "../providers/PlayerContext";
import AlbumItem from "./albums/AlbumItem";
import ArtistItem from "./artist/ArtistItem";
import TrackItem from "./tracks/TrackItem";

type TrackListProps = {
  searchData: any[];
};

export const SearchList = ({ searchData }: TrackListProps) => {
  const { playTrack } = useAudioPlayerGlobal();
  const router = useRouter();

  const handleTrackSelected = async (track: Track, index: number) => {
    await playTrack(track, index);
    router.push("/player");
  };

  const handleClickOnAritst = (id: string) => {
    console.log(id);
    router.push({ pathname: "/search/artist/[id]", params: { id } });
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={searchData}
      keyExtractor={(item) => `${item.type}-${item._id}`}
      renderItem={({ item, index }) => {
        switch (item.type) {
          case "artist":
            return (
              <ArtistItem handleOnSelect={handleClickOnAritst} artist={item} />
            );
          case "album":
            return <AlbumItem album={item} />;
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
};
