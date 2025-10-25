// Moved Home screen into (tabs) so it becomes a tab
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const suggestions = [
  { id: "1", image: require("../../assets/Home - Audio Listing/Container 26.png"), title: "Reflection", subtitle: "Christina Aguilera" },
  { id: "2", image: require("../../assets/Home - Audio Listing/Container 27.png"), title: "In The Stars", subtitle: "Benson Boone" },
];

const charts = [
  { id: "c1", image: require("../../assets/Home - Audio Listing/Container 31.png"), title: "Top 50", subtitle: "Canada" },
  { id: "c2", image: require("../../assets/Home - Audio Listing/Container 32.png"), title: "Top 50", subtitle: "Global" },
  { id: "c3", image: require("../../assets/Home - Audio Listing/Container 33.png"), title: "Top 50", subtitle: "Trending" },
];

const albums = [
  { id: "a1", image: require("../../assets/Home - Audio Listing/Image 36.png"), title: "ME", subtitle: "Jessica Gonzalez" },
  { id: "a2", image: require("../../assets/Home - Audio Listing/Image 39.png"), title: "Magna nost", subtitle: "Brian Thomas" },
  { id: "a3", image: require("../../assets/Home - Audio Listing/Image 40.png"), title: "Magna nost", subtitle: "Christopher" },
];

const artists = [
  { id: "p1", image: require("../../assets/Home - Audio Listing/Avatar 3.png"), name: "Jennifer Wilson" },
  { id: "p2", image: require("../../assets/Home - Audio Listing/Image 41.png"), name: "Elizabeth Hall" },
  { id: "p3", image: require("../../assets/Home - Audio Listing/Image 45.png"), name: "Anthony" },
];

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48 }}>
      <View style={styles.header}>
        <Image source={require("../../assets/Home - Audio Listing/Good morning,.png")} style={styles.logo} />
        <View style={styles.headerRight}>
          <Image source={require("../../assets/Home - Audio Listing/Ashley Scott.png")} style={styles.avatarSmall} />
        </View>
      </View>

      <Text style={styles.greeting}>Good morning,</Text>
      <Text style={styles.name}>Ashley Scott</Text>

      <View style={styles.searchRow}>
        <Image source={require("../../assets/Home - Audio Listing/Textbox 2.png")} style={styles.searchBg} />
        <TextInput placeholder="What you want to listen to" style={styles.searchInput} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suggestions for you</Text>
        </View>
        <FlatList
          data={suggestions}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.suggestionCard}>
              <Image source={item.image} style={styles.suggestionImage} />
              <View style={styles.cardOverlay} />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Charts</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <FlatList
          data={charts}
          horizontal
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.chartCard}>
              <Image source={item.image} style={styles.chartImage} />
              <View style={{ paddingTop: 8 }}>
                <Text style={styles.chartTitle}>{item.title}</Text>
                <Text style={styles.chartSub}>{item.subtitle}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Trending albums</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <FlatList
          data={albums}
          horizontal
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.albumCard}>
              <Image source={item.image} style={styles.albumImage} />
              <Text style={styles.albumTitle}>{item.title}</Text>
              <Text style={styles.albumSub}>{item.subtitle}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Popular artists</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <FlatList
          data={artists}
          horizontal
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.artistCard}>
              <Image source={item.image} style={styles.artistImage} />
              <Text style={styles.artistName}>{item.name}</Text>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followText}>Follow</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  logo: { width: 36, height: 36, resizeMode: "contain" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  avatarSmall: { width: 40, height: 40, borderRadius: 20 },
  greeting: { color: "#6b7280", marginLeft: 16, fontSize: 14 },
  name: { fontSize: 22, fontWeight: "800", marginLeft: 16, marginTop: 6 },
  searchRow: { paddingHorizontal: 16, marginTop: 12, position: "relative" },
  searchBg: { width: width - 32, height: 48, resizeMode: "stretch", position: "absolute", left: 16, top: 0 },
  searchInput: { height: 48, paddingHorizontal: 20, borderRadius: 12, backgroundColor: "transparent" },
  section: { marginTop: 22 },
  sectionHeader: { paddingHorizontal: 16, marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700", paddingHorizontal: 16 },
  seeAll: { color: "#9ca3af", marginRight: 16 },
  suggestionCard: { width: 260, height: 160, marginRight: 12, borderRadius: 12, overflow: "hidden" },
  suggestionImage: { width: "100%", height: "100%", resizeMode: "cover" },
  cardOverlay: { position: "absolute", left: 0, right: 0, bottom: 0, height: 56, backgroundColor: "rgba(0,0,0,0.4)" },
  cardText: { position: "absolute", left: 12, bottom: 12 },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cardSubtitle: { color: "#e5e7eb", fontSize: 12, marginTop: 4 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 },
  chartCard: { width: 140, marginRight: 12, borderRadius: 12, overflow: "hidden" },
  chartImage: { width: "100%", height: 120, resizeMode: "cover" },
  chartTitle: { fontWeight: "700" },
  chartSub: { color: "#9ca3af", fontSize: 12 },
  albumCard: { width: 120, marginRight: 12 },
  albumImage: { width: 120, height: 120, borderRadius: 8 },
  albumTitle: { fontWeight: "700", marginTop: 8 },
  albumSub: { color: "#9ca3af", fontSize: 12 },
  artistCard: { width: 120, marginRight: 12, alignItems: "center" },
  artistImage: { width: 96, height: 96, borderRadius: 48 },
  artistName: { marginTop: 8, fontSize: 14 },
  followButton: { marginTop: 8, backgroundColor: "#111827", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 18 },
  followText: { color: "#fff", fontWeight: "700" },
});
