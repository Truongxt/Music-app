import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function LaunchScreen() {
  const bg = require("../assets/Launch Screen/Your musicYour artists.png");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground source={bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay} />

        <View style={styles.content}>
          {/* Top logo is part of the background image; keep space for it */}
          <View style={{ height: 120 }} />

          <Text style={styles.title}>Your music</Text>
          <Text style={styles.title}>Your</Text>
          <Text style={styles.title}>artists</Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.primaryButton}
              accessibilityRole="button"
              onPress={() => router.push(("/(tabs)/home" as unknown) as any)}
            >
              <Text style={styles.primaryText}>Create an account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              accessibilityRole="button"
              onPress={() => router.push(("/(tabs)/home" as unknown) as any)}
            >
              <Text style={styles.secondaryText}>I already have an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#fff",
    fontSize: 44,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 48,
    marginBottom: 2,
  },
  buttons: {
    marginTop: 32,
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    width: "86%",
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    // subtle shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    // elevation for Android
    elevation: 6,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    width: "86%",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#19d6f0",
    fontSize: 16,
    fontWeight: "600",
  },
});
