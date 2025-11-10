import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/common/Header";
import { colors, radius } from "../constants/tokens";
import { moderateScale, scale, verticalScale } from "../helpers/scales";
import { useAuth } from "../providers/AuthContext";
import { defaultStyles } from "../styles";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnLogin = async () => {
    try {
      await login(username, password);
      router.replace("/(drawer)/(tabs)/home");
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  const handleOnChangeUsername = (text: string) => {
    setUsername(text);
  }

  const handleOnChangePassword = (text: string)=>{
    setPassword(text);
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Header backIcon />
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/app_logo.png")}
            style={{
              width: scale(100),
              height: verticalScale(80),
              resizeMode: "contain",
            }}
          />
          <Text style={{ fontSize: moderateScale(27), fontWeight: "600" }}>
            Login to app
          </Text>
        </View>
        <View style={styles.loginInfor}>
          <View style={{ width: "100%", gap: 10 }}>
            <TextInput onChangeText={(value) => handleOnChangeUsername(value)} placeholder="Username" style={styles.loginInforInput} />
            <TextInput onChangeText={(value) => handleOnChangePassword(value)} secureTextEntry placeholder="Password" style={styles.loginInforInput} />
            <TouchableOpacity
              onPress={() => handleOnLogin()}
              style={styles.button}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", gap: 5, alignItems: "center" }}>
            <Text>Don&apos;t have account?</Text>
            <Pressable>
              <Text>Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(30),
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    gap: verticalScale(12),
  },
  loginInforInput: {
    borderColor: colors.borderColor,
    borderRadius: radius.inputRadius,
    paddingHorizontal: 15,
    borderWidth: 1,
    width: "100%",
  },
  loginInfor: {
    width: "100%",
    gap: 10,
  },
  button: {
    borderRadius: radius.inputRadius,
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 12,
  },
});
