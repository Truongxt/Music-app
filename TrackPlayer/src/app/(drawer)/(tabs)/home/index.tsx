import ArtistCard from "@/src/components/artist/ArtistCard";
import Header from "@/src/components/common/Header";
import { SearchBar } from "@/src/components/common/SearchBar";
import { unkownUserUri } from "@/src/constants/images";
import { colors, fontSize } from "@/src/constants/tokens";
import { Album, Artist, Track } from "@/src/constants/types";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { useAuth } from "@/src/providers/AuthContext";
import { artistService } from "@/src/services/artistService";
import { defaultStyles } from "@/src/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { suggestion } from "@/assets/dummyData/dummy";
import AlbumList from "@/src/components/albums/AlbumList";
import SuggestionTrack from "@/src/components/tracks/SuggestionTrack";
import { useAudioPlayerGlobal } from "@/src/providers/PlayerContext";
import { albumService } from "@/src/services/albumService";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const router = useRouter();
  const { playTrack } = useAudioPlayerGlobal();
  const { user } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const data = await artistService.getPopularArtist();
        setArtists(data);
      } catch (err) {
        console.log("Lỗi trong quá trình lấy top artist: " + err);
      }
    };
    const fetchAlbums = async () => {
      try {
        const data = await albumService.findAll();
        setAlbums(data);
      } catch (err) {
        console.log("Lỗi trong quá trình lấy albums: " + err);
      }
    };
    fetchArtist();
    fetchAlbums();
  }, []);

  const handleOnSelectSuggestion = async (track: Track) => {
    playTrack(track);
    router.push("/player");
  };

  const handleClickOnAritst = (id: string) => {
    router.push(`/home/artist/${id}`);
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Header
        leftIcon={<Image source={require("@/assets/images/app_logo.png")} />}
        rightSection={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scale(20),
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={moderateScale(26)}
              color={colors.textMuted}
            />
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                style={{
                  width: moderateScale(32),
                  height: moderateScale(32),
                  borderRadius: moderateScale(16),
                }}
                resizeMode="cover"
                source={{ uri: user?.avatar ? user.avatar : unkownUserUri }}
              />
            </Pressable>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Chào user */}
        <View>
          <Text
            style={{ color: colors.smallText, marginBottom: verticalScale(5) }}
          >
            Good Morning,
          </Text>
          <Text
            style={{ fontSize: moderateScale(fontSize.lg), fontWeight: "700" }}
          >
            {user?.displayName}
          </Text>
          <SearchBar style={{ marginVertical: verticalScale(15) }} />

          {/* Suggest for you */}
          <View style={styles.sections}>
            <Text
              style={styles.sectionText}
            >
              Suggestion for you
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={suggestion}
              contentContainerStyle={{ gap: scale(15) }}
              renderItem={({ item }) => (
                <SuggestionTrack
                  handleOnSelect={handleOnSelectSuggestion}
                  track={item as unknown as Track}
                />
              )}
            />
          </View>

          {/* Trending albums */}
          <View style={styles.sections}>
            <Text
              style={styles.sectionText}
            >
              Trending Albums
            </Text>
            <AlbumList horizontal albums={albums} />
          </View>

          {/* popular artist */}
          <View style={styles.sections}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={styles.sectionText}
              >
                Popular Artist
              </Text>
              <TouchableOpacity>
                <Text style={{ color: colors.smallText }}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ gap: scale(25) }}
              data={artists}
              renderItem={({ item }) => (
                <ArtistCard artist={item} onPress={handleClickOnAritst} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sections: {
    marginVertical: verticalScale(20),
  },
  sectionText: {
    fontSize: moderateScale(fontSize.base),
    fontWeight: "600",
    marginBottom: verticalScale(10),
  },
});
