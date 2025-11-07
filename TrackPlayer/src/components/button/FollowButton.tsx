import { colors, fontSize } from "@/src/constants/tokens";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

type FollowButtonProps = {
  style?: ViewStyle;
  followed?: boolean;
  onPress: () => void;
};

export default function FollowButton({ style, followed, onPress }: FollowButtonProps) {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={[
        style,
        {
          backgroundColor: followed ? "white" : "black",
          borderWidth: 1,
          borderColor: followed ? colors.smallText : "black",
          paddingHorizontal: scale(20),
          paddingVertical: verticalScale(8),
          borderRadius: 30,
        },
      ]}
    >
      <Text
        style={{
          fontSize: moderateScale(fontSize.xs + 2),
          fontWeight: "600",
          color: followed ? colors.smallText : "white",
        }}
      >
        {followed ? "Followed" : "Follow"}
      </Text>
    </TouchableOpacity>
  );
}
