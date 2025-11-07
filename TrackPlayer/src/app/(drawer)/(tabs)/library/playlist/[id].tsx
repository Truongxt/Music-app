import Header from "@/src/components/common/Header";
import { TrackList } from "@/src/components/tracks/TrackList";
import { unknownTrackImageUri } from "@/src/constants/images";
import { colors, fontSize, radius } from "@/src/constants/tokens";
import { Playlist } from "@/src/constants/types";
import { formatSecondsToMinutes } from "@/src/helpers/formatters";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { playlistService } from "@/src/services/playlistService";
import { defaultStyles } from "@/src/styles";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlaylistDetail() {
  const { id } = useLocalSearchParams();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) return;
      try {
        const data = await playlistService.findById(id as string);
        setPlaylist(data as Playlist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaylist();
    setTotalDuration(
      playlist?.tracks?.reduce((sum, track) => sum + (track.duration || 0), 0) ?? 0
    );
  }, [id, playlist?.tracks]);

  if (!playlist) {
    return (
      <SafeAreaView
        style={[
          defaultStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Header backIcon />
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  const trackImages = playlist.tracks.slice(0, 4);
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Header
        backIcon
        rightSection={
          <MaterialIcons
            name="cast-connected"
            size={moderateScale(22)}
            color={colors.textMuted}
          />
        }
      />
      <View style={{ flexDirection: "row", gap: scale(10) }}>
        <View>
          {trackImages.length >= 4 ? (
            <View
              style={{
                width: moderateScale(120),
                height: moderateScale(120),
                flexDirection: "row",
                flexWrap: "wrap",
                borderRadius: moderateScale(radius.cardRadius),
                overflow: "hidden",
              }}
            >
              {trackImages.map((item, index) => (
                <Image
                  key={item._id ?? index}
                  source={{ uri: item.img }}
                  style={{ width: "50%", height: "50%" }}
                />
              ))}
            </View>
          ) : (
            <Image
              source={{
                uri:
                  trackImages.length >= 1
                    ? trackImages[0].img
                    : unknownTrackImageUri,
              }}
              style={{
                width: moderateScale(120),
                height: moderateScale(120),
                borderRadius: moderateScale(radius.cardRadius),
              }}
            />
          )}
        </View>
        <View style={{gap: verticalScale(10)}}>
          <Text
            style={{ fontSize: moderateScale(fontSize.lg), fontWeight: "600" }}
          >
            {playlist.name}
          </Text>
          <Text style={{fontSize: moderateScale(fontSize.sm), fontWeight: '500', color: colors.smallText}}>
            Total duration:  {formatSecondsToMinutes(totalDuration)}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.rows,
          {
            justifyContent: "space-between",
            marginVertical: verticalScale(15),
          },
        ]}
      >
        <View style={styles.rows}>
          <Pressable onPress={() => console.log("More options pressed")}>
            <Entypo
              name="dots-three-horizontal"
              size={moderateScale(22)}
              color={colors.smallText}
            />
          </Pressable>
        </View>
        <View style={styles.rows}>
          <Pressable onPress={() => console.log("Shuffle pressed")}>
            <MaterialCommunityIcons
              name="shuffle-variant"
              size={scale(22)}
              color={colors.smallText}
            />
          </Pressable>
          <Pressable
            style={styles.playButton}
            onPress={() => console.log("Play pressed")}
          >
            <Ionicons name="play-outline" color="white" size={scale(28)} />
          </Pressable>
        </View>
      </View>
      <TrackList tracks={playlist.tracks} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rows: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  playButton: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(50),
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  groupText: {
    fontWeight: "600",
    fontSize: fontSize.base,
    marginVertical: verticalScale(12),
  },
});
