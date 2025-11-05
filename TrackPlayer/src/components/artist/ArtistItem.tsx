import { colors, fontSize } from "@/src/constants/tokens";
import { Artist } from "@/src/constants/types";
import { formatThousandsToK } from "@/src/helpers/formatters";
import { moderateScale, verticalScale } from "@/src/helpers/scales";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import FollowButton from "../button/FollowButton";
import { useArtist } from "@/src/providers/ArtistContext";
import { userService } from "@/src/services/userService";

type AritstItemProps = {
  artist: Artist;
  handleOnSelect: (id: string) => void;
};

export default function ArtistItem({
  artist,
  handleOnSelect,
}: AritstItemProps) {
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
    <Pressable
      onPress={() => handleOnSelect(artist._id)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: verticalScale(8),
      }}
    >
      <Image
        source={{ uri: artist.image }}
        style={{
          height: moderateScale(60),
          width: moderateScale(60),
          borderRadius: 100,
        }}
      />
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: fontSize.sm, fontWeight: "600" }}>
          {artist.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <FontAwesome name="user-o" size={10} color="black" />
          <Text style={{ fontSize: fontSize.xs + 1, color: colors.smallText }}>
            {formatThousandsToK(artist.followers)} Followers
          </Text>
        </View>
      </View>
      <FollowButton
        followed={followed}
        onPress={onFollow}
        style={{ position: "absolute", right: 0 }}
      />
    </Pressable>
  );
}
