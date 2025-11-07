import { usePlaylist } from "@/src/providers/PlayListContext";
import { playlistService } from "@/src/services/playlistService";
import { defaultStyles } from "@/src/styles";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { FlatList, Pressable, Text } from "react-native";
import PlayListItem from "../playlist/PlayListItem";

type Props = {
  onMount: (fn: { open: () => void; close: () => void }) => void;
};

export default function PlaylistPickerBottomSheet({ onMount }: Props) {
  const { state, dispatch } = usePlaylist();
  const ref = useRef<BottomSheet>(null);
  const snaps = useMemo(() => ["50%", "75%"], []);
  const open = () => ref.current?.expand();
  const close = () => ref.current?.close();

  useEffect(() => {
    onMount({ open, close });
  }, []);

  const onAddToPlaylist = async (playlistId: string, trackId: string) => {
    try {
      const data = await playlistService.toggleInTrack(playlistId, trackId);
      dispatch({ type: "UPDATE_PLAYLIST", payload: data });
      console.log(state.playlists);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snaps}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetView style={defaultStyles.container}>
        <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 18 }}>
          Add to playlist
        </Text>

        <Pressable onPress={()=>console.log(state.playlists)}><Text>Chấm</Text></Pressable>

        <FlatList
          data={state.playlists}
          keyExtractor={(item) => item._id!}
          renderItem={({ item }) => (
            <PlayListItem
              add
              playlist={item}
              toggleTrackPlaylist={onAddToPlaylist}
            />
          )}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
