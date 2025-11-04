import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../providers/AuthContext";
import { CommentSheetProvider } from "../providers/CommentBottomSheetContext";
import { AudioPlayerProvider } from "../providers/PlayerContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AudioPlayerProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <CommentSheetProvider>
              <RootNaviagtion />
              <StatusBar style="auto" />
            </CommentSheetProvider>
          </GestureHandlerRootView>
        </AudioPlayerProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const RootNaviagtion = () => {
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
