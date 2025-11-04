import { fontSize } from "@/src/constants/tokens";
import { moderateScale, scale } from "@/src/helpers/scales";
import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";

type FollowButtonProps = {
    style?: ViewStyle
}

export default function FollowButton({style}: FollowButtonProps) {
  return (
    <Pressable
      style={[style, {
        backgroundColor: "black",
        paddingHorizontal: scale(20),
        paddingVertical: 8,
        borderRadius: 30,
      }]}
    >
      <Text
        style={{
          fontSize: moderateScale(fontSize.xs + 2),
          fontWeight: "600",
          color: "white",
        }}
      >
        Follow
      </Text>
    </Pressable>
  );
}
