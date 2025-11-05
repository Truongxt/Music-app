import { fontSize } from "@/src/constants/tokens";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  centerTitle?: string;
  leftTitle?: string;
  backIcon?: boolean;
  appLogo?: Image;
  rightSection?: React.ReactNode;
  leftIcon?: React.ReactNode;
};

export default function Header({
  centerTitle,
  leftTitle,
  backIcon = false,
  leftIcon,
  rightSection,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: verticalScale(20),
        backgroundColor: "#fff",
      }}
    >
      {/* Bên trái */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {backIcon && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={moderateScale(24)}
              color="black"
            />
          </TouchableOpacity>
        )}

        {!backIcon && leftIcon && <View>{leftIcon}</View>}

        {leftTitle && (
          <Text
            style={{
              fontSize: moderateScale(fontSize.base),
              fontWeight: "500",
              marginLeft: scale(8),
            }}
          >
            {leftTitle}
          </Text>
        )}
      </View>

      {/* Tiêu đề trung tâm */}
      {centerTitle ? (
        <Text
          style={{
            fontSize: moderateScale(fontSize.base),
            fontWeight: "500",
            color: "#000",
          }}
        >
          {centerTitle}
        </Text>
      ) : (
        <View style={{ width: scale(24) }} /> // giữ cân đối nếu không có tiêu đề
      )}

      {/* Icon bên phải */}
      {rightSection ? (
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: scale(10) }}
        >
          {rightSection}
        </View>
      ) : (
        <View style={{ width: scale(24) }} />
      )}
    </View>
  );
}
