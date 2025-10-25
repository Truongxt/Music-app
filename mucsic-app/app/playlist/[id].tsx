import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const samplePlaylists = {
  p1: {
    id: "p1",
    title: "Ipsum sit nulla",
    owner: "Ashley Scott",
  image: require("../../assets/My Playlists/Image 110.png"),
    songs: [
      { id: "s1", title: "Song A", artist: "Ashley Scott", duration: "3:12" },
      { id: "s2", title: "Song B", artist: "Ashley Scott", duration: "2:58" },
    ],
  },
  p2: {
    id: "p2",
    title: "Occaecat aliq",
    owner: "Jose Garcia",
  image: require("../../assets/My Playlists/Image 111.png"),
    songs: [
      { id: "s3", title: "Track X", artist: "Jose Garcia", duration: "4:02" },
    ],
  },
};

export default function PlaylistDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = (params.id as string) || "p1";
  const playlist = (samplePlaylists as any)[id] ?? samplePlaylists.p1;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Playlists</Text>
      </View>

      <View style={styles.header}>
        <Image source={playlist.image} style={styles.image} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.playTitle}>{playlist.title}</Text>
          <Text style={styles.playMeta}>{playlist.owner} · {playlist.songs.length} songs</Text>
        </View>
      </View>

      <FlatList
        data={playlist.songs}
        keyExtractor={(i) => i.id}
        renderItem={({ item, index }) => (
          <View style={styles.songRow}>
            <Text style={styles.trackIndex}>{index + 1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songMeta}>{item.artist} · {item.duration}</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={20} color="#9ca3af" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: { flexDirection: "row", alignItems: "center", padding: 12, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  backBtn: { padding: 6 },
  title: { fontSize: 16, fontWeight: "700", marginLeft: 6 },
  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  image: { width: 86, height: 86, borderRadius: 8 },
  playTitle: { fontSize: 18, fontWeight: "800" },
  playMeta: { color: "#9ca3af", marginTop: 6 },
  songRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12 },
  trackIndex: { width: 24, color: "#9ca3af" },
  songTitle: { fontWeight: "700" },
  songMeta: { color: "#9ca3af", marginTop: 4 },
});
