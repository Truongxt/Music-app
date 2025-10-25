import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const tags = ["Playlists", "New tag", "Songs", "Albums", "Artists"];

const playlists = [
  { id: "p1", image: require("../../assets/My Playlists/Image 110.png"), title: "Ipsum sit nulla", owner: "Ashley Scott", songs: 12 },
  { id: "p2", image: require("../../assets/My Playlists/Image 111.png"), title: "Occaecat aliq", owner: "Jose Garcia", songs: 4 },
];

const tracks = [
  { id: "t1", image: require("../../assets/My Library/Image 101.png"), title: "FLOWER", artist: "Jessica Gonzalez", plays: "2,1M", duration: "3:36" },
  { id: "t2", image: require("../../assets/My Library/Image 102.png"), title: "Shape of You", artist: "Anthony Taylor", plays: "68M", duration: "03:35" },
  { id: "t3", image: require("../../assets/My Library/Image 103.png"), title: "Blinding Lights", artist: "Ashley Scott", plays: "9M", duration: "04:12" },
  { id: "t4", image: require("../../assets/My Library/Image 104.png"), title: "Levitating", artist: "Anthony Taylor", plays: "9M", duration: "07:48" },
  { id: "t5", image: require("../../assets/My Library/Image 105.png"), title: "Astronaut in the Ocean", artist: "Pedro Moreno", plays: "23M", duration: "3:36" },
  { id: "t6", image: require("../../assets/My Library/Image 106.png"), title: "Dynamite", artist: "Elena Jimenez", plays: "10M", duration: "06:22" },
];

export default function Library() {
  const [activeTag, setActiveTag] = useState<string>("Playlists");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const toggleLike = (id: string) => setLiked((s) => ({ ...s, [id]: !s[id] }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search-outline" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.tagsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {tags.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.chip, activeTag === t && styles.chipActive]}
              onPress={() => setActiveTag(t)}
            >
              <Text style={[styles.chipText, activeTag === t && styles.chipTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Playlists section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your playlists</Text>
        <FlatList
          data={playlists}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.playlistRow}
              onPress={() => router.push((`/playlist/${item.id}` as unknown) as any)}
            >
              <Image source={item.image} style={styles.playlistImage} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.playlistTitle}>{item.title}</Text>
                <Text style={styles.playlistMeta}>{item.owner}  ·  {item.songs} songs</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Tracks list */}
      <View style={[styles.section, { marginTop: 8 }]}>
        <Text style={styles.sectionTitle}>Tracks</Text>
        <FlatList
          data={tracks}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.trackRow}>
              <Image source={item.image} style={styles.trackImage} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackMeta}>{item.artist}  ·  {item.plays}  ·  {item.duration}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.heartWrapper}>
                <Ionicons name={liked[item.id] ? "heart" : "heart-outline"} size={20} color={liked[item.id] ? "#06b6d4" : "#9ca3af"} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  searchIcon: { padding: 8 },
  tagsRow: { paddingVertical: 8 },
  chip: { backgroundColor: "#f3f4f6", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  chipActive: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e5e7eb" },
  chipText: { color: "#374151" },
  chipTextActive: { color: "#111827", fontWeight: "700" },
  section: { paddingHorizontal: 16, marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  playlistRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  playlistImage: { width: 56, height: 56, borderRadius: 6 },
  playlistTitle: { fontSize: 15, fontWeight: "700" },
  playlistMeta: { color: "#9ca3af", marginTop: 4 },
  trackRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16 },
  trackImage: { width: 48, height: 48, borderRadius: 8 },
  trackTitle: { fontSize: 15, fontWeight: "700" },
  trackMeta: { color: "#9ca3af", marginTop: 4 },
  heartWrapper: { padding: 8 },
  fab: { position: "absolute", right: 18, bottom: 84, backgroundColor: "#111827", width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", elevation: 6 },
});
