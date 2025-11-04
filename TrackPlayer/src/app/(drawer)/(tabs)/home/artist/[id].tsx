import AlbumList from "@/src/components/albums/AlbumList";
import Header from "@/src/components/common/Header";
import TrackItem from "@/src/components/tracks/TrackItem";
import { colors, fontSize, radius } from "@/src/constants/tokens";
import { Album, Track } from "@/src/constants/types";
import { formatThousandsToK } from "@/src/helpers/formatters";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { useAudioPlayerGlobal } from "@/src/providers/PlayerContext";
import { albumService } from "@/src/services/albumService";
import { artistService } from "@/src/services/artistService";
import { trackService } from "@/src/services/trackService";
import { defaultStyles } from "@/src/styles";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArtistProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { playTrack } = useAudioPlayerGlobal();
  const [artist, setArtist] = useState<any>();
  const [tracks, setTracks] = useState<[Track]>();
  const [albums, setAlbums] = useState<[Album]>(); 
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchAritst = async () => {
      try {
        const artist = await artistService.findById(String(id));
        setArtist(artist);
      } catch (err) {
        console.log("Lỗi get artist by id: " + err);
      }
    };
    const fetchTrack = async () => {
      try {
        const tracks = await trackService.getByArtist(String(id));
        setTracks(tracks);
      } catch (err) {
        console.log("Lỗi get tracks by artist: " + err);
      }
    };
    const fetchAlbum = async () =>{
      try {
        const albums = await albumService.findByAritst(String(id));
        console.log(albums);
        setAlbums(albums);
      } catch (err) {
        console.log("Lỗi get albums by artist: " + err);
      }
    }
    fetchAritst();
    fetchTrack();
    fetchAlbum();
  }, [id]);

  const handleClickOnTrack = (track: Track) => {
    playTrack(track);
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Header backIcon />
      <ScrollView>
        {/* Thông tin artist */}
        <View style={{ alignItems: "center", gap: verticalScale(10) }}>
          <Image
            style={{
              height: moderateScale(170),
              width: moderateScale(170),
              borderRadius: moderateScale(100),
            }}
            source={{ uri: artist?.image }}
          />
          <Text style={{ fontSize: fontSize.lg, fontWeight: "700" }}>
            {artist?.name}
          </Text>
          <Text style={{ fontSize: fontSize.xs + 1, color: colors.smallText }}>
            {formatThousandsToK(artist?.followers ? artist.followers : 0)}{" "}
            Followers
          </Text>
        </View>

        {/* Actions */}
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
            <Pressable
              style={{
                backgroundColor: "black",
                paddingHorizontal: scale(20),
                paddingVertical: 8,
                borderRadius: 30,
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(fontSize.xs + 2),
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Follow
              </Text>
            </Pressable>
            <Pressable>
              <Entypo
                name="dots-three-horizontal"
                size={moderateScale(22)}
                color={colors.smallText}
              />
            </Pressable>
          </View>
          <View style={styles.rows}>
            <Pressable>
              <MaterialCommunityIcons
                name="shuffle-variant"
                size={scale(22)}
                color={colors.smallText}
              />
            </Pressable>
            <Pressable style={styles.playButton}>
              <Ionicons name="play-outline" color="white" size={scale(28)} />
            </Pressable>
          </View>
        </View>

        {/* Popular songs */}
        <View>
          <Text style={styles.groupText}>Popular</Text>
          {tracks &&
            tracks.map((track) => (
              <TrackItem
                onTrackSelect={handleClickOnTrack}
                key={track._id}
                track={track}
              />
            ))}
        </View>

        {/* Albums */}
        
        {albums && <View>
          <Text style={styles.groupText}>Album</Text>
          <AlbumList horizontal albums={albums}/>
        </View>}

        {/* Mô tả */}
        <View>
          <Text style={styles.groupText}>About</Text>
          {artist?.descriptionImg && (
            <Image source={{ uri: artist.descriptionImg }} style={{height: verticalScale(200), borderRadius: radius.cardRadius, marginBottom: verticalScale(10)}}/>
          )}
          <Text
            style={{ fontSize: moderateScale(fontSize.sm - 1), lineHeight: moderateScale(25), color: colors.smallText, fontWeight: "500" }}
            numberOfLines={expanded ? undefined : 5}
          >
            {artist?.description}
          </Text>
          <Pressable
            style={{ alignItems: "center", marginVertical: 10 }}
            onPress={() => setExpanded(!expanded)}
          >
            <Text
              style={{
                fontSize: fontSize.sm,
                fontWeight: "600",
                color: colors.primary,
              }}
            >
              {expanded ? "Hide" : "View more"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
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
    marginVertical: verticalScale(12)
  },
});
