import { colors, fontSize, radius } from "@/src/constants/tokens";
import { Playlist } from "@/src/constants/types";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

type PlayListItemProps = {
  playlist: Playlist;
  onPress?: () => void;
};

export default function PlayListItem({ playlist, onPress }: PlayListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", gap: scale(10), alignItems: "center" }}
    >
      {playlist.tracks.length >= 4 ? (
        <View
          style={{
            width: moderateScale(62),
            height: moderateScale(62),
            flexDirection: "row",
            flexWrap: "wrap",
            borderRadius: moderateScale(radius.cardRadius),
            overflow: "hidden",
          }}
        >
          {playlist.tracks.map((item) => (
            <Image
              key={item._id}
              source={{ uri: item.img }}
              style={{ width: "50%", height: "50%" }}
            />
          ))}
        </View>
      ) : (
        <Image
          source={{ uri: playlist.tracks[0].img }}
          style={{
            width: moderateScale(60),
            height: moderateScale(60),
            borderRadius: moderateScale(radius.cardRadius),
          }}
        />
      )}

      <View style={{ gap: verticalScale(10) }}>
        <Text
          style={{ fontWeight: "600", fontSize: moderateScale(fontSize.sm) }}
        >
          {playlist.name}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(fontSize.xs + 1),
            color: colors.smallText,
          }}
        >
          {playlist.tracks.length} songs
        </Text>
      </View>
      <AntDesign
        style={{ position: "absolute", right: 0 }}
        name="right"
        size={20}
        color="black"
      />
    </Pressable>
  );
}
