import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Feed() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Feed</Text>
      <Text style={styles.sub}>Feed screen placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "700" },
  sub: { color: "#6b7280", marginTop: 8 },
});
