import { Comment } from "@/src/constants/types";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleProps } from "react-native-reanimated";
import CommentItem from "./CommentItem";

type CommentListProps = {
  comments: Comment[];
  style?: StyleProps;
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <BottomSheetFlatList 
      data={comments}
      renderItem={({ item }: { item: Comment }) => (
        <CommentItem comment={item} />
      )}
      
      showsVerticalScrollIndicator={false}
    />
  );
}
