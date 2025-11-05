import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { unknownTrackImageUri } from "../constants/images";
import { colors, screenPadding } from "../constants/tokens";
import {
  formatSecondsToMinutes,
  formatThousandsToK,
} from "../helpers/formatters";
import { useCommentSheet } from "../providers/CommentBottomSheetContext";
import { useAudioPlayerGlobal } from "../providers/PlayerContext";
import { commentService } from "../services/commentService";
import { userService } from "../services/userService";
import { useTrack } from "../providers/TrackContext";
import { trackService } from "../services/trackService";

export default function Player() {
  const [likedTrack, setLikedTrack] = useState<boolean>(false);
  const router = useRouter();
  const { openCommentSheet } = useCommentSheet();
  const { tracks, dispatch } = useTrack();
  const { currentTrack, status, pause, resume, seek } = useAudioPlayerGlobal();
  const [isSliding, setIsSliding] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const isLiked = tracks.some((item) => item._id === currentTrack?._id);
    setLikedTrack(isLiked);
  }, [tracks, currentTrack]);

  const handleOnOpenCommentSheet = async () => {
    if (!currentTrack?._id) return;
    try {
      const comments = await commentService.findByTrack(
        String(currentTrack._id)
      );
      openCommentSheet({ type: "track", id: currentTrack._id }, comments);
    } catch (err) {
      console.log(err);
    }
  };

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

  const handlePlayPause = async () => {
    if (status?.playing) await pause();
    else await resume();
  };

  if (!currentTrack) return <></>;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: currentTrack?.img || unknownTrackImageUri }}
        style={styles.background}
        blurRadius={20}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Play</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="down" color="white" size={scale(20)} />
          </TouchableOpacity>
        </View>

        {/* Ảnh bài hát */}
        <View style={styles.center}>
          <Image
            source={{ uri: currentTrack?.img || unknownTrackImageUri }}
            style={styles.cover}
          />
        </View>

        {/* Dưới cùng */}
        <View style={styles.endPart}>
          <View style={{ gap: verticalScale(5) }}>
            <Text style={styles.title}>{currentTrack.title}</Text>
            <Text style={styles.artist}>
              {currentTrack.artist.map((a) => a.name).join(", ")}
            </Text>
          </View>

          {/* Thanh tiến trình */}
          <View style={styles.progressContainer}>
            <Slider
              style={{ width: "100%", height: verticalScale(30) }}
              minimumValue={0}
              maximumValue={status?.duration || 1}
              value={isSliding ? sliderValue : status?.currentTime}
              minimumTrackTintColor={colors.minimumTrackTintColor}
              maximumTrackTintColor={colors.maximumTrackTintColor}
              thumbTintColor="#fff"
              onSlidingStart={() => setIsSliding(true)}
              onValueChange={(value) => setSliderValue(value)}
              onSlidingComplete={async (value) => {
                setIsSliding(false);
                await seek(value);
              }}
            />
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>
                {formatSecondsToMinutes(status?.currentTime ?? 0)}
              </Text>
              <Text style={styles.timeText}>
                {formatSecondsToMinutes(status?.duration ?? 0)}
              </Text>
            </View>
          </View>

          {/* Nút điều khiển */}
          <View style={styles.controls}>
            <MaterialCommunityIcons
              name="shuffle-variant"
              size={scale(22)}
              color="white"
            />
            <TouchableOpacity>
              <Feather name="skip-back" size={scale(26)} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.playButton}
            >
              <Ionicons
                name={status?.playing ? "pause" : "play"}
                color="black"
                size={scale(28)}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="skip-forward" size={scale(26)} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo
                name="dots-three-horizontal"
                size={scale(24)}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* Hành động */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleOnLike}>
              <MaterialCommunityIcons
                name={likedTrack ? "heart" : "heart-outline"}
                size={scale(18)}
                color={likedTrack ? "red" : "white"}
              />
            </TouchableOpacity>
            <Text style={styles.actionText}>
              {formatThousandsToK(currentTrack.likes)}
            </Text>
            <TouchableOpacity onPress={handleOnOpenCommentSheet}>
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={scale(18)}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.actionText}>
              {formatThousandsToK(currentTrack.comments)}
            </Text>
            <Octicons
              style={{ position: "absolute", right: 0 }}
              name="upload"
              size={scale(20)}
              color="white"
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000090",
  },
  background: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    paddingHorizontal: screenPadding.horizontal,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00000090",
  },
  headerText: {
    color: "white",
    fontSize: moderateScale(20),
  },
  center: {
    alignItems: "center",
  },
  cover: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: scale(12),
    marginBottom: verticalScale(30),
  },
  endPart: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "#00000090",
  },
  title: {
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  artist: {
    color: "white",
    opacity: 0.9,
    fontSize: moderateScale(12),
  },
  progressContainer: {
    width: "100%",
    alignSelf: "center",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: "#ccc",
    fontSize: moderateScale(10),
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: verticalScale(20),
    gap: scale(30),
  },
  playButton: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  actionText: {
    color: "white",
    fontSize: moderateScale(10),
  },
});
