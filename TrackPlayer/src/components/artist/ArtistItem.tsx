import { colors, fontSize } from "@/src/constants/tokens";
import { Artist } from "@/src/constants/types";
import { formatThousandsToK } from "@/src/helpers/formatters";
import { moderateScale, verticalScale } from "@/src/helpers/scales";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import FollowButton from "../button/FollowButton";

type AritstItemProps = {
  artist: Artist;
  handleOnSelect: (id: string) => void;
};

export default function ArtistItem({ artist, handleOnSelect }: AritstItemProps) {
  return (
    <Pressable
    onPress={()=>handleOnSelect(artist._id)}
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
      <FollowButton style={{ position: "absolute", right: 0 }} />
    </Pressable>
  );
}
