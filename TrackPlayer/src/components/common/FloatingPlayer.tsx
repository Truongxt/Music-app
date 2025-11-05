import { colors, fontSize } from "@/src/constants/tokens";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { useAuth } from "@/src/providers/AuthContext";
import { useAudioPlayerGlobal } from "@/src/providers/PlayerContext";
import { useTrack } from "@/src/providers/TrackContext";
import { trackService } from "@/src/services/trackService";
import { userService } from "@/src/services/userService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

export const FloatingPlayer = ({ style }: ViewProps) => {
  const { currentTrack, status, pause, resume } = useAudioPlayerGlobal();
  const { dispatch, tracks } = useTrack();
  const [likedTrack, setLikedTrack] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    const isLiked = tracks.some((item) => item._id === currentTrack?._id);
    setLikedTrack(isLiked);
  }, [tracks, currentTrack]);

  const handleOnLike = async () => {
    if (!currentTrack) return;

    try {
      const res = await userService.toggleLikeTrack(currentTrack._id);
      const liked = res?.likedTracks.includes(currentTrack._id);

      setLikedTrack(liked);

      const trackDetails = await trackService.getById(currentTrack._id);

      if (liked) {
        dispatch({ type: "ADD_TRACK", payload: trackDetails });
      } else {
        dispatch({ type: "REMOVE_TRACK", payload: currentTrack._id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTogglePlay = async () => {
    if (status?.playing) await pause();
    else await resume();
  };

  if(!currentTrack){
    return <></>;
  }

  return (
    <Pressable
      onPress={() => router.push("/player")}
      style={[style, styles.container]}
    >
      {/* Ảnh bìa */}
      <Image style={styles.img} source={{ uri: currentTrack?.img }} />

      {/* Thông tin bài hát */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {currentTrack?.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {currentTrack?.artist?.map((a) => a.name)}
        </Text>
      </View>

      {/* Nút hành động */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleOnLike}>
          <Ionicons
            name={likedTrack ? "heart" : "heart-outline"}
            color={likedTrack ? "red" : "white"}
            size={moderateScale(26)}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTogglePlay}>
          <Ionicons
            name={status?.playing ? "pause-outline" : "play-outline"}
            color="white"
            size={moderateScale(30)}
            style={{ marginLeft: scale(10) }}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: scale(10),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.darkBackground,
  },
  img: {
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(6),
  },
  info: {
    gap: verticalScale(5),
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: colors.textOnDarkBackgound,
    fontSize: moderateScale(fontSize.sm),
    fontWeight: "600",
  },
  artist: {
    color: colors.textOnDarkBackgound,
    fontSize: moderateScale(fontSize.xs),
    opacity: 0.8,
  },
  actions: {
    gap: scale(10),
    flexDirection: "row",
    alignItems: "center",
  },
});
