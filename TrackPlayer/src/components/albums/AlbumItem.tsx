import { colors, fontSize } from "@/src/constants/tokens";
import { Album } from "@/src/constants/types";
import { moderateScale, verticalScale } from "@/src/helpers/scales";
import React from "react";
import { Image, Text, View } from "react-native";
type AlbumItemProps = {
  album: Album;
};
export default function AlbumItem({ album }: AlbumItemProps) {
  return (
    <View style={{flexDirection: "row", paddingVertical: verticalScale(8), gap: 10, alignItems: "center"}}>
      <Image source={{ uri: album.cover }} style={{height: moderateScale(60), width: moderateScale(60), borderRadius: 2}}/>
      <View style={{gap: 5}}>
        <Text style={{fontSize: fontSize.sm, fontWeight: "600"}}>{album.title}</Text>
        <Text style={{fontSize: fontSize.xs + 1, color: colors.smallText}}>{album.artist.name}</Text>
      </View>
    </View>
  );
}
