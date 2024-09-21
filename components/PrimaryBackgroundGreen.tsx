import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export default function PrimaryBackgroundGreen({
  children,
}: PropsWithChildren) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={styles.bg_absolute}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Montserrat",
  },
  content: {
    flex: 1,
    backgroundColor: "#31B775",
  },
  bg_absolute: {
    position: "absolute",
    width: "100%",
    height: 1200,
    backgroundColor: "white",
    opacity: 0.06,
    transform: [{ rotate: "40deg" }],
  },
});
