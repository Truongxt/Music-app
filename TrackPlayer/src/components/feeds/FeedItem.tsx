import { colors, fontSize } from "@/src/constants/tokens";
import { Post, Track } from "@/src/constants/types";
import {
  formatSecondsToMinutes,
  formatThousandsToK,
  formatTimeAgo,
} from "@/src/helpers/formatters";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { useCommentSheet } from "@/src/providers/CommentBottomSheetContext";
import { commentService } from "@/src/services/commentService";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type FeedItemProps = {
  post: Post;
  onPress?: (track: Track) => void;
};

export default function FeedItem({ post, onPress }: FeedItemProps) {
  const artist = post.artist;
  const track = post.track;
  const { openCommentSheet } = useCommentSheet();

  const handleOpenCommentSheet = async () => {
    try {
      const comments = await commentService.findByPost(String(post._id));
      openCommentSheet({ type: "post", id: post._id }, comments);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: artist?.image }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.artistName}>{artist?.name}</Text>
          <Text style={styles.posted}>
            Posted a track • {formatTimeAgo(post.createdAt.toString())}
          </Text>
        </View>
      </View>

      {/* Track section */}
      <View>
        <Text style={{ lineHeight: 20 }}>{post.content}</Text>
      </View>
      <Pressable
        style={styles.trackContainer}
        onPress={() => onPress && onPress(track)}
      >
        <Image source={{ uri: track?.img }} style={styles.trackImage} />
        <View style={styles.overlay}>
          <Text style={styles.trackTitle}>{track?.title}</Text>
          <View style={styles.row}>
            <Text
              style={{
                color: "white",
                fontSize: fontSize.xs,
                fontWeight: "500",
              }}
            >
              {post.artist.name}
            </Text>
            <View style={styles.row}>
              <Ionicons name="play-outline" size={13} color="#fff" />
              <Text style={styles.play}>
                {formatThousandsToK(track?.views)}
              </Text>
              <Entypo name="dot-single" color="white" size={20} />
              <Text style={styles.time}>
                {formatSecondsToMinutes(track?.duration)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      {/* Actions */}
      <View style={styles.actionRow}>
        <View style={styles.row}>
          <Ionicons name="heart-outline" size={18} color={colors.textMuted} />
          <Text style={styles.count}>{formatThousandsToK(post.likes)}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleOpenCommentSheet}>
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{formatThousandsToK(post.comments)}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="repeat"
            size={18}
            color={colors.textMuted}
          />
          <Text style={styles.count}>1</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(25),
    gap: verticalScale(5),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: 50,
  },
  headerText: {
    marginLeft: scale(8),
    flex: 1,
  },
  artistName: {
    fontWeight: "600",
    fontSize: moderateScale(14),
  },
  posted: {
    color: "#888",
    fontSize: moderateScale(12),
  },
  trackContainer: {
    marginTop: verticalScale(10),
    position: "relative",
  },
  trackImage: {
    width: "100%",
    height: verticalScale(350),
    borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: scale(15),
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  trackTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: moderateScale(fontSize.base),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(4),
    justifyContent: "space-between",
  },
  play: {
    color: "#fff",
    fontSize: moderateScale(12),
    marginLeft: scale(3),
  },
  dot: {
    color: "#ddd",
    marginHorizontal: scale(6),
  },
  time: {
    color: "#fff",
    fontSize: moderateScale(12),
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(8),
    gap: 15,
  },
  count: {
    marginLeft: scale(4),
    fontSize: moderateScale(13),
    color: colors.textMuted,
  },
  iconSpacing: {
    marginLeft: scale(14),
  },
});
