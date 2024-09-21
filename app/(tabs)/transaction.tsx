import { ScrollView, View } from "react-native";
import { TopSpending } from "@/screens/transaction/TopSpending";
import TransactionChart from "@/screens/transaction/TransactionChart";
import TotalChart from "@/screens/transaction/TotalChart";

export default function Transaction() {
  return (
    <View>
      <ScrollView>
        <TransactionChart />
        <TotalChart />
        <TopSpending />
      </ScrollView>
    </View>
  );
}
