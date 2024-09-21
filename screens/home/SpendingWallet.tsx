import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, View } from "react-native";
import { formatMoney } from "@/utils/Common";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTransaction } from "@/hooks/useTransaction";

export default function SpendingWallet() {
  const { incomeThisMonth, expensesThisMonth } = useTransaction();
  const wallet = incomeThisMonth - expensesThisMonth;

  return (
    <View style={styles.container}>
      <View style={styles.row_direction}>
        <AntDesign name="export" size={18} color={Colors.junggleGreen} />
        <ThemedText style={{ fontSize: 14, marginLeft: 6 }} type="subtitle">
          Spending Wallet
        </ThemedText>
      </View>
      <View style={styles.row_direction}>
        <ThemedText
          style={{
            fontSize: 14,
            marginRight: 8,
            color: wallet < 0 ? Colors.amaranth : "#000",
          }}
          type="subtitle"
        >
          {formatMoney(wallet)}
        </ThemedText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "gray",
    width: "90%",
    position: "absolute",
    left: "5%",
    top: "46.5%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  row_direction: {
    flexDirection: "row",
    alignItems: "center",
  },
});
