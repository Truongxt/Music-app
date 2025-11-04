import { fontSize } from "@/src/constants/tokens";
import { Artist } from "@/src/constants/types";
import { moderateScale } from "@/src/helpers/scales";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type ArtistCartProps = {
  artist: Artist;
  onPress: (artistId: string) => void;
};

export default function ArtistCard({ artist, onPress }: ArtistCartProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPress(artist._id)}>
        <Image style={styles.image} source={{ uri: artist.image }} />
      </Pressable>
      <Text style={{ fontSize: fontSize.xs + 2 }}>{artist.name}</Text>
      <Pressable style={styles.button}>
        <Text
          style={{
            fontSize: fontSize.xs + 2,
            fontWeight: "600",
            color: "white",
          }}
        >
          Follow
        </Text>
      </Pressable>
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
