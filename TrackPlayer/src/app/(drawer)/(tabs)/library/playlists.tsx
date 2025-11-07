import AddPlaylistModal from "@/src/components/common/AddPlaylistModal";
import Header from "@/src/components/common/Header";
import PlayListItem from "@/src/components/playlist/PlayListItem";
import { colors, fontSize } from "@/src/constants/tokens";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { usePlaylist } from "@/src/providers/PlayListContext";
import { defaultStyles } from "@/src/styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Playlists() {
  const { state } = usePlaylist();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleOnCloseModal = () => {
    setModalVisible(false);
  };

  const handleOnPlaylistClick = (playlistId: string) => {
    router.push(`/(drawer)/(tabs)/library/playlist/${playlistId}`);
  };

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
        renderItem={({ item }) => <PlayListItem onPress={handleOnPlaylistClick} playlist={item} />}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: scale(55),
          height: scale(55),
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
      {modalVisible && (
        <AddPlaylistModal visible={modalVisible} onClose={handleOnCloseModal} />
      )}
    </SafeAreaView>
  );
}
