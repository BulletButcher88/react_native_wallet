import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {

  primary: "#24c16b",
  secondary: "#0c381f",

  green: "#66D59a",
  lightGreen: "#e6fef0",

  lime: "#00BA63",
  emerald: "#2BC978",

  red: "#FF4134",
  lightRed: "#FFF1F0",

  purple: "#6B3CE9",
  greyPurple: '#4c669f',
  midGreyPurple: '#3b5998',
  darkGreyPurple: '#192f6a',
  lightPurple: "#F3EFFF",

  yellow: "#FFC664",
  lightYello: "#FFF9EC",

  black: "#1E1F20",
  white: "#FFFFFF",

  lightGrey: "#FCFBFC",
  grey: "#C1C3C5",
  darkGrey: "#444",

  transparent: 'transparent',
};

export const SIZES = {
  // global size
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font size
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 40 }
}

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
