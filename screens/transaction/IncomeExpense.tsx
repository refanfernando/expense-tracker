import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, View } from "react-native";
import { formatMoney, months } from "@/utils/Common";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTransaction } from "@/hooks/useTransaction";

export default function IncomeExpense() {
  const date = new Date();
  const currentMonth = date.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const {
    totalIncomeLastMonth,
    totalIncomeThisMonth,
    totalSpendLastMonth,
    totalSpendThisMonth,
    incomeThisMonth,
    expensesThisMonth,
  } = useTransaction();

  const checkMoreLessData = (currVal: number, newVal: number) => {
    const total = currVal - newVal;
    if (total < 0)
      return `${formatMoney(Math.abs(total))} less than ${
        months[previousMonth]
      }`;
    return !total
      ? "-"
      : `${formatMoney(total)} more than ${months[previousMonth]}`;
  };

  const data = [
    {
      label: "Income",
      subtitle: checkMoreLessData(totalIncomeThisMonth, totalIncomeLastMonth),
      total: incomeThisMonth,
    },
    {
      label: "Expense",
      subtitle: checkMoreLessData(totalSpendThisMonth, totalSpendLastMonth),
      total: expensesThisMonth,
    },
  ];

  return (
    <View style={styles.container}>
      {data.map((d, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.row_direction}>
            <AntDesign name="export" size={18} color={Colors.junggleGreen} />
            <View>
              <ThemedText
                style={{ fontSize: 14, marginLeft: 6 }}
                type="subtitle"
              >
                {d.label}
              </ThemedText>
              <ThemedText
                style={{ fontSize: 9, marginLeft: 6, color: "#C1C1C1" }}
              >
                {d.subtitle}
              </ThemedText>
            </View>
          </View>
          <View style={styles.row_direction}>
            <ThemedText
              style={{ fontSize: 14, marginRight: 8 }}
              type="subtitle"
            >
              {formatMoney(d.total)}
            </ThemedText>
          </View>
        </View>
      ))}
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
    top: "-15%",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
  },
  row_direction: {
    flexDirection: "row",
    alignItems: "center",
  },
});
