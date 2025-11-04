import { Post, Track } from "@/src/constants/types";
import { useAudioPlayerGlobal } from "@/src/providers/PlayerContext";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import FeedItem from "./FeedItem";

type FeedListProps = {
  posts: Post[];
};

export const FeedList = ({ posts }: FeedListProps) => {
  const router = useRouter();
  const { playTrack } = useAudioPlayerGlobal();
  const handleOnClickTrack = async(track: Track) => {
    await playTrack(track);
    router.push("/player");
  }
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <FeedItem post={item} onPress={handleOnClickTrack} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};
 