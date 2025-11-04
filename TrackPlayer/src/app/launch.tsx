import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "../helpers/scales";

const { width, height } = Dimensions.get("window");

export default function LaunchScreen() {
  const bg = require("@/assets/images/launch_image.png");

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay} />
      <ImageBackground source={bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay} />

        <View style={styles.content}>
          <Image
            source={require("@/assets/images/app_logo.png")}
            style={{
              width: scale(100),
              height: verticalScale(80),
              resizeMode: "contain",
            }}
          />

          <View>
            <Text style={styles.title}>Your music</Text>
            <Text style={styles.title}>Your</Text>
            <Text style={styles.title}>artists</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            accessibilityRole="button"
            onPress={() => router.push("/login")}
          >
            <Text style={styles.primaryText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            accessibilityRole="button"
            onPress={() => router.push("/login")}
          >
            <Text style={styles.secondaryText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(39),
    fontWeight: "700",
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
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    width: "100%",
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
