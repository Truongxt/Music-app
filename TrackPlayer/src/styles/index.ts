import { colors, fontSize, screenPadding } from "@/src/constants/tokens";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		paddingHorizontal: screenPadding.horizontal
	},
	text: {
		fontSize: fontSize.base,
		color: colors.text,
	}
})