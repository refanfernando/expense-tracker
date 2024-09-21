import FormInputTransaction from "@/screens/manage-transaction/FormInputTransaction";
import { Dimensions, ScrollView, StyleSheet } from "react-native";

export default function AddTransaction() {
  const height = Dimensions.get("screen").height;
  return (
    <ScrollView style={{ height }}>
      <FormInputTransaction />
    </ScrollView>
  );
}
