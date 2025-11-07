import { unknownTrackImageUri } from "@/src/constants/images";
import { colors, fontSize, radius } from "@/src/constants/tokens";
import { Playlist } from "@/src/constants/types";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { usePlaylistPicker } from "@/src/providers/PlaylistPickerSheetContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type PlayListItemProps = {
  playlist: Playlist;
  onPress?: (playlistId: string) => void;
  toggleTrackPlaylist?: (playlistId: string, trackId: string) => void;
  add?: boolean;
};

export default function PlayListItem({
  playlist,
  onPress,
  add = false,
  toggleTrackPlaylist,
}: PlayListItemProps) {
  const { selectedTrack } = usePlaylistPicker();
  const added =
    add && playlist.tracks.some((t) => t._id === selectedTrack?._id);

  return (
    <Pressable
      onPress={
        add
          ? () =>
              playlist._id &&
              selectedTrack?._id &&
              toggleTrackPlaylist &&
              toggleTrackPlaylist(playlist._id, selectedTrack?._id)
          : () => {
              onPress && playlist._id && onPress(playlist._id);
            }
      }
      style={{
        flexDirection: "row",
        gap: scale(10),
        alignItems: "center",
        marginVertical: verticalScale(8),
      }}
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
          source={{
            uri:
              playlist.tracks.length >= 1
                ? playlist.tracks[0].img
                : unknownTrackImageUri,
          }}
          style={{
            width: moderateScale(62),
            height: moderateScale(62),
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
            fontWeight: "500",
          }}
        >
          {playlist.tracks.length} songs
        </Text>
      </View>
      {add ? (
        added ? (
          <Ionicons
            name="checkmark-circle-sharp"
            size={24}
            color="#16D6EE"
            style={sytles.icon}
          />
        ) : (
          <AntDesign
            name="plus-circle"
            size={20}
            color="black"
            style={sytles.icon}
          />
        )
      ) : (
        <AntDesign style={sytles.icon} name="right" size={20} color="black" />
      )}
    </Pressable>
  );
}

const sytles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 0,
  },
});
