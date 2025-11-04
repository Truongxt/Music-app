import { colors } from "@/src/constants/tokens";
import { moderateScale, scale } from "@/src/helpers/scales";
import { Ionicons } from "@expo/vector-icons";
import { StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
type SearchBarType = {
  value?: string;
  onChange?: (text: string) => void;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
  onSubmit?: () => void;
};

export const SearchBar = ({ value, onChange, onClear, style, onSubmit }: SearchBarType) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        <Ionicons name="search" size={moderateScale(23)} />
      </View>
      <TextInput
        style={styles.inputText}
        value={value}
        onChangeText={onChange}
        placeholder="What do you want to listen?"
        onSubmitEditing={onSubmit}
      />
      {value && value.length > 0 && (
        <TouchableOpacity onPress={() => onClear?.()} style={styles.clear}>
          <Ionicons name="close-circle" size={moderateScale(20)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: scale(50),
    paddingHorizontal:  scale(10),
  },
  inputText: {
    width: "80%",
  },
  clear: {
    right: scale(-20),
  },
});
