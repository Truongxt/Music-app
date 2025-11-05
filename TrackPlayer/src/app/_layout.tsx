import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../providers/AuthContext";
import { CommentSheetProvider } from "../providers/CommentBottomSheetContext";
import { AudioPlayerProvider } from "../providers/PlayerContext";
import { PlaylistProvider } from "../providers/PlayListContext";
import { ArtistProvider } from "../providers/ArtistContext";
import { TrackProvider } from "../providers/TrackContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <ArtistProvider>
            <PlaylistProvider>
              <TrackProvider>
                <CommentSheetProvider>
                  <AudioPlayerProvider>
                    <RootNavigation />
                    <StatusBar style="auto"/>
                  </AudioPlayerProvider>
                </CommentSheetProvider>
              </TrackProvider>
            </PlaylistProvider>
          </ArtistProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const RootNavigation = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="player" options={{ headerShown: false }} />
      </Stack>
    );
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="launch" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    );
  }
};
