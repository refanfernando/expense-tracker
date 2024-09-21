import { Stack } from "expo-router";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Transactions } from "@/screens/transaction/Transactions";

export default function SectionTransactions() {
  const height = Dimensions.get("screen").height;

  return (
    <>
      <Stack.Screen options={{ title: "Transactions" }} />
      <ScrollView style={styles(height).container}>
        <Transactions />
      </ScrollView>
    </>
  );
}

const styles = (height?: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      height: height,
    },
  });
