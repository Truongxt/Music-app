import { Dimensions } from "react-native";

// Kích thước chuẩn — ví dụ iPhone 14 Pro
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const { width, height } = Dimensions.get("window");

export const scale = (size: number) => (width / BASE_WIDTH) * size;
export const verticalScale = (size: number) => (height / BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
