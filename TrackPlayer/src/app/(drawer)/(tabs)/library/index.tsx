import Header from "@/src/components/common/Header";
import { TrackList } from "@/src/components/tracks/TrackList";
import { colors } from "@/src/constants/tokens";
import { Track } from "@/src/constants/types";
import { moderateScale } from "@/src/helpers/scales";
import { useAuth } from "@/src/providers/AuthContext";
import { userService } from "@/src/services/userService";
import { defaultStyles } from "@/src/styles";
import { Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Library() {
  const { likedTrackIds } = useAuth();
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  useEffect(() => {
    const fetchLikedTracks = async () => {
      const data = await userService.getLikedTracks();
      setLikedTracks(data);
    };

    fetchLikedTracks();
  }, [likedTrackIds]);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Header
        leftTitle="Your Library"
        rightSection={
          <Fontisto
            name="search"
            size={moderateScale(22)}
            color={colors.textMuted}
          />
        }
      />
      <TrackList tracks={likedTracks} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
