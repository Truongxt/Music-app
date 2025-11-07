import { colors, fontSize } from "@/src/constants/tokens";
import { moderateScale, scale, verticalScale } from "@/src/helpers/scales";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type AddPlaylistModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string)=> void;
};

export default function AddPlaylistModal({
  visible,
  onClose,
  onSave
}: AddPlaylistModalProps) {
    const [inputName, setInputName] = useState<string>("");
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            padding: scale(20),
            borderRadius: 10,
            gap: verticalScale(10),
          }}
        >
          <View style={styles.section}>
            <Text style={styles.title}>Name for your playlist</Text>
          </View>
          <View style={[styles.section, { marginVertical: verticalScale(20) }]}>
            <TextInput placeholder="Playlist name...." style={styles.input} onChangeText={(text)=>setInputName(text)}/>
          </View>
          <View
            style={[styles.section, { flexDirection: "row", gap: scale(30) }]}
          >
            <TouchableOpacity
              style={[
                styles.button,
                { borderColor: colors.textMuted, borderWidth: 1 },
              ]}
              onPress={onClose}
            >
              <Text style={styles.normalText}>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>onSave(inputName)}
              style={[styles.button, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.normalText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: fontSize.lg, fontWeight: "600" },
  normalText: {
    fontWeight: "500",
    fontSize: moderateScale(fontSize.sm),
  },
  button: {
    alignItems: "center",
    paddingVertical: scale(10),
    width: scale(70),
    borderRadius: scale(20),
  },
  input: {
    width: "100%",
    borderBottomColor: colors.smallText,
    fontSize: fontSize.sm + 1,
    borderBottomWidth: 0.5,
  },
});
