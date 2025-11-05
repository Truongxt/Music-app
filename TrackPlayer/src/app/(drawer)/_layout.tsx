import CustomDrawerContent from "@/src/components/common/CustomDrawerContent";
import { useArtist } from "@/src/providers/ArtistContext";
import { usePlaylist } from "@/src/providers/PlayListContext";
import { useTrack } from "@/src/providers/TrackContext";
import { userService } from "@/src/services/userService";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";

export default function DrawerLayout() {
  const { dispatch: dispatchArtist } = useArtist();
  const { dispatch: dispatchPlaylist } = usePlaylist();
  const { dispatch: dispatchTrack } = useTrack();

  useEffect(() => {
    const fetchLibrary = async () => {
      const data = await userService.getUserLibrary();
      dispatchArtist({ type: "SET_ARTISTS", payload: data.artists });
      dispatchPlaylist({ type: "SET_PLAYLISTS", payload: data.playlists });
      dispatchTrack({ type: "SET_TRACKS", payload: data.tracks });
    };

    fetchLibrary();
  }, []);
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
