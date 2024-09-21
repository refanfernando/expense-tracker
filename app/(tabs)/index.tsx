import Header from "@/screens/home/Header";
import Transaction from "@/screens/home/Transaction";
import SpendingWallet from "@/screens/home/SpendingWallet";
import { StyleSheet, View } from "react-native";

export default function index() {
  return (
    <View style={styles.container}>
      <Header />
      <Transaction />
      <SpendingWallet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
  },
});
