import { unkownUserUri } from "@/src/constants/images";
import { colors, radius } from "@/src/constants/tokens";
import { Comment } from "@/src/constants/types";
import { useAuth } from "@/src/providers/AuthContext";
import { useCommentSheet } from "@/src/providers/CommentBottomSheetContext";
import { commentService } from "@/src/services/commentService";
import { defaultStyles } from "@/src/styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CommentList from "../comment/CommentList";

type Props = {
  onMount: (fn: { open: () => void; close: () => void }) => void;
  comments: Comment[];
};

export default function CommentBottomSheet({
  onMount,
  comments,

}: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [inputComment, setInputComment] = useState<string>("");
  const { user } = useAuth();
  const { target, setComments } = useCommentSheet();
  const open = () => bottomSheetRef.current?.expand();
  const close = () => bottomSheetRef.current?.close();

  // mount once
  useEffect(() => {
    onMount({ open, close });
  }, [onMount]);

  const handleOnPostCmt = async () => {
    if (!target || !inputComment) return;

    try {
      const newComment = await commentService.postComment({
        content: inputComment,
        track: target.type === "track" ? target.id : undefined,
        post: target.type === "post" ? target.id : undefined,
      });

      setComments((prev) => [newComment, ...prev]);
      setInputComment("");
    } catch (err) {
      console.error("Failed to send comment:", err);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enableContentPanningGesture={false}
      enablePanDownToClose
      enableDynamicSizing={false}
      snapPoints={["60%"]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
    >
      <View style={defaultStyles.container}>
        <CommentList comments={comments} />
        <View style={styles.inputGroup}>
          <Image
            style={{ height: 40, width: 40, borderRadius: 100 }}
            source={{ uri: user?.avatar ?? unkownUserUri }}
          />
          <View style={styles.commentBar}>
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              value={inputComment}
              onChangeText={setInputComment}
            />
            <TouchableOpacity>
              <Ionicons name="happy-outline" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOnPostCmt}>
              <AntDesign name="send" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  commentBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.textMuted,
    borderRadius: radius.inputRadius,
    paddingRight: 10,
  },
  commentInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
});
