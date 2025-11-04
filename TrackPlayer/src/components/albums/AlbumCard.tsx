import { fontSize, radius } from "@/src/constants/tokens";
import { Album } from "@/src/constants/types";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface AlbumCardProps {
  album: Album;
  onPress?: () => void;
}

export default function AlbumCard({ album, onPress }: AlbumCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Ảnh bìa album */}
      <Image source={{uri: album.cover}} style={styles.cover} />

      {/* Tên album */}
      <Text style={styles.title} numberOfLines={1}>
        {album.title}
      </Text>

      {/* Tên nghệ sĩ */}
      <Text style={styles.artist} numberOfLines={1}>
        {album.artist.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 16,
  },
  cover: {
    height: 140,
    borderRadius: radius.cardRadius,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: "#111",
    marginTop: 6,
  },
  artist: {
    fontSize: fontSize.xs,
    color: "#777",
    marginTop: 2,
  },
});
