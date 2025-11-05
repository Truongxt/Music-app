import { fontSize } from "@/src/constants/tokens";
import { Artist } from "@/src/constants/types";
import { moderateScale } from "@/src/helpers/scales";
import { useArtist } from "@/src/providers/ArtistContext";
import { userService } from "@/src/services/userService";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import FollowButton from "../button/FollowButton";

type ArtistCartProps = {
  artist: Artist;
  onPress: (artistId: string) => void;
};

export default function ArtistCard({ artist, onPress }: ArtistCartProps) {
  const { state, dispatch } = useArtist();
  const followed = state.artists.some((a) => a._id === artist._id);

  const onFollow = async () => {
    try {
      const res = await userService.toggleFollowAritst(artist._id);

      if (followed) {
        dispatch({ type: "DELETE_ARTIST", payload: artist._id });
      } else {
        dispatch({ type: "ADD_ARTIST", payload: artist });
      }
    } catch (err) {
      console.log("Lỗi khi follow artist", err);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPress(artist._id)}>
        <Image style={styles.image} source={{ uri: artist.image }} />
      </Pressable>
      <Text style={{ fontSize: fontSize.xs + 2 }}>{artist.name}</Text>
      <FollowButton onPress={onFollow} followed={followed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  image: {
    height: moderateScale(130),
    width: moderateScale(130),
    borderRadius: 100,
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
  },
});
