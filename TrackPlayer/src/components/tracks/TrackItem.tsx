import { unknownTrackImageUri } from "@/src/constants/images";
import { colors, fontSize, radius } from "@/src/constants/tokens";
import { Track } from "@/src/constants/types";
import {
  formatSecondsToMinutes,
  formatThousandsToK,
} from "@/src/helpers/formatters";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TrackItemType = {
  track: Track;
  onTrackSelect?: (track: Track) => void;
};

export default function TrackItem({
  track,
  onTrackSelect: onTrackSelected,
}: TrackItemType) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => onTrackSelected &&  onTrackSelected(track)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: track.img ? track.img : unknownTrackImageUri }}
          style={styles.cover}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {track.artist.map((a) => a.name).join(", ")}
          </Text>

          <View style={styles.subRow}>
            <Ionicons
              name="play-outline"
              size={moderateScale(12)}
              color="#777"
            />
            <Text style={styles.views}>{formatThousandsToK(track.views)}</Text>
            <Entypo
              name="dot-single"
              size={moderateScale(20)}
              color={colors.textMuted}
            />
            <Text style={styles.duration}>
              {formatSecondsToMinutes(track.duration)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ position: "absolute", right: 0 }}>
        <Entypo
          name="dots-three-horizontal"
          size={moderateScale(18)}
          color="#555"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(8),
  },
  cover: {
    width: scale(60),
    height: scale(60),
    borderRadius: moderateScale(radius.cardRadius),
  },
  info: {
    marginLeft: scale(10),
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: moderateScale(fontSize.sm),
    fontWeight: "600",
    color: "#111",
  },
  artist: {
    fontSize: moderateScale(fontSize.xs),
    color: "#777",
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(2),
  },
  views: {
    fontSize: moderateScale(fontSize.xs - 1),
    color: "#777",
    marginLeft: scale(3),
  },
  duration: {
    fontSize: moderateScale(11),
    color: "#777",
  },
});
