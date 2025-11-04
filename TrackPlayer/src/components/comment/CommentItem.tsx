import { unkownUserUri } from "@/src/constants/images";
import { fontSize } from "@/src/constants/tokens";
import { Comment } from "@/src/constants/types";
import { formatThousandsToK, formatTimeAgo } from "@/src/helpers/formatters";
import { verticalScale } from "@/src/helpers/scales";
import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type CommentItemProps = {
  comment: Comment;
};

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: verticalScale(8),
      }}
    >
      {/* Avatar */}
      <Image
        style={{ height: 35, width: 35, borderRadius: 100, marginRight: 10 }}
        source={{ uri: comment.user.avatar ?? unkownUserUri }}
      />

      {/* Nội dung comment */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", lineHeight: 22 }}>
          {comment.user.displayName}{" "}
          <Text style={{ fontWeight: "normal" }}>{comment.content}</Text>
        </Text>
        <View style={{ flexDirection: "row", gap: 15, marginTop: 3 }}>
          <Text style={{ fontSize: fontSize.xsm }}>
            {formatTimeAgo(comment.createdAt.toString())}
          </Text>
          <Text style={{ fontSize: fontSize.xsm }}>
            {formatThousandsToK(comment.likes)} Like
          </Text>
          <Text style={{ fontSize: fontSize.xsm }}>Reply</Text>
        </View>
      </View>

      {/* Nút like */}
      <TouchableOpacity>
        <EvilIcons name="like" size={22} color="black" />
      </TouchableOpacity>
    </View>
  );
}
