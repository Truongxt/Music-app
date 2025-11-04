import { unkownUserUri } from "@/src/constants/images";
import { colors, fontSize } from "@/src/constants/tokens";
import { moderateScale, verticalScale } from "@/src/helpers/scales";
import { useAuth } from "@/src/providers/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawerContent(props: any) {
  const { logout, user } = useAuth();
  const router = useRouter();

  if (user === null) return <></>;

  const handleOnLogout = async () => {
    try {
      await logout();
      router.replace("/launch");
    } catch (err) {
      console.log("Login failed:", err);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={{ uri: user.avatar ? user.avatar : unkownUserUri }}
          style={{
            height: moderateScale(50),
            width: moderateScale(50),
            borderRadius: 100,
          }}
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            {user?.displayName}
          </Text>

          <TouchableOpacity>
            <Text
              style={{ color: colors.smallText, fontSize: fontSize.sm - 2 }}
            >
              Xem hồ sơ
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <DrawerItemList {...props} />
      </View>
      <Pressable
        style={({ pressed }) => ({
          alignItems: "center",
          flexDirection: "row",
          marginTop: 10,
          paddingVertical: verticalScale(12),
          paddingHorizontal: 5,
          opacity: pressed ? 0.5 : 1,
          gap: 10
        })}
        onPress={handleOnLogout}
      >
        <MaterialIcons name="logout" size={24} color="black" />
        <Text style={{ color: "black",fontSize: fontSize.sm, fontWeight: "500" }}>Đăng xuất</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}
