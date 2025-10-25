import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Search() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.sub}>Search screen placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "700" },
  sub: { color: "#6b7280", marginTop: 8 },
});
