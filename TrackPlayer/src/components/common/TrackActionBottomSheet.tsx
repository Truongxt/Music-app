import { unknownTrackImageUri } from "@/src/constants/images";
import { colors, fontSize, radius } from "@/src/constants/tokens";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { usePlaylistPicker } from "@/src/providers/PlaylistPickerSheetContext";
import { useTrackActionSheet } from "@/src/providers/TrackActionBottomSheetContext";
import { useTrack } from "@/src/providers/TrackContext";
import { trackService } from "@/src/services/trackService";
import { userService } from "@/src/services/userService";
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onMount: (fn: { open: () => void; close: () => void }) => void;
};

export default function TrackActionBottomSheet({ onMount }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedTrack } = useTrackActionSheet();
  const { tracks, dispatch } = useTrack();
  const [likedTrack, setLikedTrack] = useState<boolean>(false);
  const { openPlaylistPicker } = usePlaylistPicker();

  useEffect(() => {
    setLikedTrack(tracks.some((t) => t._id === selectedTrack?._id));
  }, [selectedTrack?._id, tracks]);

  const snapPoints = useMemo(() => ["35%"], []);

  const open = () => bottomSheetRef.current?.expand();
  const close = () => bottomSheetRef.current?.close();

  useEffect(() => {
    onMount({ open, close });
  }, []);

  const handleOnLike = async () => {
    if (!selectedTrack?._id) return;
    try {
      const res = await userService.toggleLikeTrack(selectedTrack._id);
      const liked = res?.likedTracks.includes(selectedTrack._id);

      setLikedTrack(liked);

      const trackDetails = await trackService.getById(selectedTrack._id);

      if (liked) {
        dispatch({ type: "ADD_TRACK", payload: trackDetails });
      } else {
        dispatch({ type: "REMOVE_TRACK", payload: selectedTrack._id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddToPlaylist = () => {
    if(!selectedTrack) return;
    openPlaylistPicker(selectedTrack);
  } 

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      backgroundStyle={{ borderRadius: 0 }}
    >
      <BottomSheetView style={{ paddingBottom: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: scale(10),
            paddingHorizontal: scale(10),
          }}
        >
          <Image
            source={{
              uri: selectedTrack?.img
                ? selectedTrack?.img
                : unknownTrackImageUri,
            }}
            style={{
              height: moderateScale(50),
              width: moderateScale(50),
              borderRadius: radius.cardRadius,
            }}
          />
          <View style={{ gap: verticalScale(5) }}>
            <Text style={{ fontSize: fontSize.sm, fontWeight: "500" }}>
              {selectedTrack?.title}
            </Text>
            <Text style={{ fontSize: fontSize.xs, color: colors.smallText }}>
              {selectedTrack?.artist.map((a) => a.name).join(", ")}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.3,
            marginVertical: verticalScale(15),
            borderColor: colors.smallText,
          }}
        ></View>
        <View style={{ paddingHorizontal: scale(10), gap: 20 }}>
          <TouchableOpacity style={styles.item} onPress={handleOnLike}>
            <MaterialCommunityIcons
              name={likedTrack ? "heart" : "heart-outline"}
              color="red"
              size={moderateScale(24)}
            />
            <Text style={styles.itemTitle}>
              {likedTrack
                ? "Remove from favorite list"
                : "Add to favorite list"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={onAddToPlaylist}
          >
            <Ionicons
              name="add-circle-outline"
              size={moderateScale(24)}
              color="black"
            />
            <Text style={styles.itemTitle}>Add to playlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <FontAwesome name="user-o" size={moderateScale(22)} color="black" />
            <Text style={styles.itemTitle}>Add to Favorite List</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: "row", gap: scale(15), alignItems: "center" },
  itemTitle: { fontSize: moderateScale(fontSize.sm) },
  artistName: { fontSize: 14, color: "#999", marginBottom: 12 },
  menu: { marginTop: 12, gap: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  itemText: { fontSize: 16 },
});
