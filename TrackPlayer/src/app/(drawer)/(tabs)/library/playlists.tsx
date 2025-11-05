import Header from "@/src/components/common/Header";
import PlayListItem from "@/src/components/playlist/PlayListItem";
import { colors, fontSize } from "@/src/constants/tokens";
import { moderateScale, verticalScale } from "@/src/helpers/scales";
import { usePlaylist } from "@/src/providers/PlayListContext";
import { defaultStyles } from "@/src/styles";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Playlists() {
  const { state } = usePlaylist();
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Header
        backIcon
        centerTitle="Playlists"
        rightSection={
          <MaterialIcons
            name="cast-connected"
            size={moderateScale(22)}
            color={colors.textMuted}
          />
        }
      />
      <Text
        style={{
          fontSize: fontSize.lg,
          fontWeight: "700",
          marginBottom: verticalScale(30),
        }}
      >
        Your playlist
      </Text>
      <FlatList
        data={state.playlists}
        renderItem={({ item }) => <PlayListItem playlist={item} />}
      />
    </SafeAreaView>
  );
}
