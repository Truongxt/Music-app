import Header from "@/src/components/common/Header";
import LibraryList from "@/src/components/LibraryList";
import { colors } from "@/src/constants/tokens";
import { moderateScale, verticalScale } from "@/src/helpers/scales";
import { useArtist } from "@/src/providers/ArtistContext";
import { usePlaylist } from "@/src/providers/PlayListContext";
import { useTrack } from "@/src/providers/TrackContext";
import { defaultStyles } from "@/src/styles";
import { Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = [
  { id: 1, title: "All" },
  { id: 2, title: "Playlists" },
  { id: 3, title: "Songs" },
  { id: 4, title: "Artists" },
];

export default function Library() {
  const [activeTab, setIsActiveTab] = useState<number>(1);
  const router = useRouter();
  const { state: artists } = useArtist();
  const { tracks } = useTrack();
  const {state: playlists} = usePlaylist();

  const combinedList = useMemo(() => {
    return [
      ...artists.artists.map((a) => ({ ...a, type: "artist" })),
      ...tracks.map((t) => ({ ...t, type: "track" })),
      ...playlists.playlists.map((p) => ({ ...p, type: "playlist" }))
    ];
  }, [artists, tracks, playlists]);

  const filteredList = useMemo(() => {
    switch (activeTab) {
      case 1:
        return combinedList;
      case 2:
        return combinedList.filter((i) => i.type === "playlist");
      case 3:
        return combinedList.filter((i) => i.type === "track");
      case 4:
        return combinedList.filter((i) => i.type === "artist");
      default:
        return [];
    }
  }, [activeTab, combinedList]);

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

      <View
        style={{
          gap: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: verticalScale(10),
        }}
      >
        {tabs.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              setIsActiveTab(item.id !== 2 ? item.id : 1);
              if (item.title === "Playlists") {
                router.push("/(drawer)/(tabs)/library/playlists");
              }
            }}
            style={{
              paddingVertical: verticalScale(8),
              borderRadius: moderateScale(20),
              backgroundColor:
                item.id === activeTab ? colors.primary : "#F2F4F3",
              flex: 1,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                color: item.id === activeTab ? "white" : colors.smallText,
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>

      <LibraryList library={filteredList} />
    </SafeAreaView>
  );
}
