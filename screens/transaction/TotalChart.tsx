import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTransaction } from "@/hooks/useTransaction";
import { months } from "@/utils/Common";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import IncomeExpense from "./IncomeExpense";

export default function TotalChart() {
  const date = new Date();
  const { totalSpendThisMonth, incomeThisMonth } = useTransaction();

  const pieData = [
    { value: incomeThisMonth, color: Colors.junggleGreen },
    { value: totalSpendThisMonth, color: Colors.schoolBusYellow },
  ];

  const formatIntl = new Intl.NumberFormat("id-ID");

  if (!incomeThisMonth && !totalSpendThisMonth) return;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <PieChart
          donut
          innerRadius={100}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <View style={styles.total_expense}>
                <AntDesign
                  name="wallet"
                  size={24}
                  color={Colors.junggleGreen}
                />
                <Text
                  style={{ marginVertical: 12, fontSize: 12, color: "#AAA" }}
                >
                  Expense Total in {months[date.getMonth()]}
                </Text>
                <ThemedText style={{ fontSize: 16 }} type="subtitle">
                  IDK {formatIntl.format(totalSpendThisMonth / 1000)}
                </ThemedText>
              </View>
            );
          }}
        />
      </View>
      <IncomeExpense />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.wildSand,
  },
  wrapper: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    paddingVertical: 30,
    marginTop: 80,
    marginHorizontal: "auto",
  },
  total_expense: {
    alignItems: "center",
  },
});
