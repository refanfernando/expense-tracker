import PrimaryBackgroundGreen from "@/components/PrimaryBackgroundGreen";
import { Colors } from "@/constants/Colors";
import { useTransactionContext } from "@/context/TransactionProvider";
import { months } from "@/utils/Common";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function TransactionChart() {
  const date = new Date();

  const {
    state: { transactions },
  } = useTransactionContext();

  const maxValue = Math.max(...transactions.map((x) => x.total));
  const barData: any = [];
  const currentMonth = date.getMonth() + 1;
  months.forEach((x, idx) => {
    const item = {
      income: 0,
      expenses: 0,
    };
    transactions
      .filter((x) => x?.date?.getMonth() === idx)
      .forEach((x) => {
        if (x.transactionType === "income") {
          item.income = x.total;
        } else {
          item.expenses = x.total;
        }
      });
    if (idx + 1 + 5 >= currentMonth && idx + 1 <= currentMonth) {
      barData.push({
        value: item ? item.income : 0,
        label: x,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: Colors.white },
        frontColor: Colors.white,
      });
      barData.push({
        value: item ? item.expenses : 0,
        frontColor: Colors.schoolBusYellow,
      });
    }
  });

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 30 }}>
        <Text style={styles.title}>Transactions</Text>
        <View style={styles.subtitle}>
          <View style={styles.wrapper_item_subtitle}>
            <View style={styles.rounded_income} />
            <Text style={styles.subtitle_text}>Income</Text>
          </View>
          <View style={styles.wrapper_item_subtitle}>
            <View style={styles.rounded_expense} />
            <Text style={styles.subtitle_text}>Expense</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <PrimaryBackgroundGreen>
      <View style={styles.container}>
        {renderTitle()}
        <BarChart
          data={barData}
          barWidth={12}
          spacing={26}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: Colors.white }}
          noOfSections={5}
          maxValue={maxValue}
        />
      </View>
    </PrimaryBackgroundGreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    paddingLeft: 20,
    borderRadius: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 24,
  },
  wrapper_item_subtitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  rounded_income: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  rounded_expense: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.schoolBusYellow,
    marginRight: 8,
  },
  subtitle_text: {
    width: 60,
    height: 16,
    color: Colors.white,
  },
});
