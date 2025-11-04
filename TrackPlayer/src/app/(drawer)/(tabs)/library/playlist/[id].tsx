import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PlaylistDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Playlist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  
});
