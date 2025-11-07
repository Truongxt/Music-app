import { unknownTrackImageUri } from "@/src/constants/images";
import { colors, fontSize, radius } from "@/src/constants/tokens";
import { Track } from "@/src/constants/types";
import {
  formatSecondsToMinutes,
  formatThousandsToK,
} from "@/src/helpers/formatters";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { useTrackActionSheet } from "@/src/providers/TrackActionBottomSheetContext";
import { useTrack } from "@/src/providers/TrackContext";
import { trackService } from "@/src/services/trackService";
import { userService } from "@/src/services/userService";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TrackItemType = {
  track: Track;
  onTrackSelect?: (track: Track) => void;
  library?: boolean;
};

export default function TrackItem({
  track,
  onTrackSelect: onTrackSelected,
  library = false,
}: TrackItemType) {
  const { tracks, dispatch } = useTrack();
  const [likedTrack, setLikedTrack] = useState<boolean>();
  const { openActionSheet } = useTrackActionSheet();
  useEffect(() => {
    if (library) {
      setLikedTrack(tracks.some((t) => t._id === track._id));
    }
  }, [tracks, track._id, library]);

  const handleOnLike = async () => {
    try {
      const res = await userService.toggleLikeTrack(track._id);
      const liked = res?.likedTracks.includes(track._id);

      setLikedTrack(liked);

      const trackDetails = await trackService.getById(track._id);

      if (liked) {
        dispatch({ type: "ADD_TRACK", payload: trackDetails });
      } else {
        dispatch({ type: "REMOVE_TRACK", payload: track._id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnThreeDotsClick = () => {
    openActionSheet(track);
  } 

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => onTrackSelected && onTrackSelected(track)}
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

      {library ? (
        <TouchableOpacity
          style={{ position: "absolute", right: 0 }}
          onPress={handleOnLike}
          hitSlop={{
            top: scale(10),
            bottom: scale(10),
            left: scale(10),
            right: scale(10),
          }}
        >
          <MaterialCommunityIcons
            name={likedTrack ? "heart" : "heart-outline"}
            size={scale(20)}
            color={likedTrack ? "red" : "white"}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        onPress={handleOnThreeDotsClick}
          style={{ position: "absolute", right: 0 }}
          hitSlop={{
            top: scale(10),
            bottom: scale(10),
            left: scale(10),
            right: scale(10),
          }}
        >
          <Entypo
            name="dots-three-horizontal"
            size={moderateScale(18)}
            color="#555"
          />
        </TouchableOpacity>
      )}
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
