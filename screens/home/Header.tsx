import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";
import { formatMoney } from "@/utils/Common";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import PrimaryBackgroundGreen from "@/components/PrimaryBackgroundGreen";
import { useTransactionContext } from "@/context/TransactionProvider";
import { useTransaction } from "@/hooks/useTransaction";

export default function Header() {
  const date = new Date();
  const { totalSpendLastMonth, totalSpendThisMonth } = useTransaction();

  const percentageDifference =
    totalSpendLastMonth > 0
      ? ((totalSpendLastMonth - totalSpendThisMonth) / totalSpendLastMonth) *
        100
      : 0;

  return (
    <PrimaryBackgroundGreen>
      <View style={styles.header_day}>
        <ThemedText style={styles.white_color} type={"default"}>
          TODAY IS
        </ThemedText>
        <ThemedText style={styles.white_color} type={"subtitle"}>
          {date.toDateString()}
        </ThemedText>
      </View>
      <View style={styles.header_spend}>
        <ThemedText style={styles.white_color} type={"default"}>
          THIS MONTH'S SPEND
        </ThemedText>
        <ThemedText
          style={[styles.white_color, { marginVertical: 18 }]}
          type={"title"}
        >
          {formatMoney(totalSpendThisMonth)}
        </ThemedText>
        {!!percentageDifference && (
          <View style={styles.wrapper_percentage}>
            <AntDesign
              name={percentageDifference >= 0 ? "circledown" : "upcircle"}
              size={24}
              color="white"
              style={{ marginRight: 12 }}
            />
            <ThemedText style={styles.white_color} type={"link"}>
              {Math.abs(percentageDifference).toFixed(2)}%{" "}
              {percentageDifference >= 0 ? "below" : "above"} last month
            </ThemedText>
          </View>
        )}
      </View>
    </PrimaryBackgroundGreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Montserrat",
  },
  white_color: {
    color: Colors.white,
  },
  header: {
    flex: 1,
    backgroundColor: "#31B775",
  },
  header_day: {
    alignItems: "center",
    marginTop: 48,
  },
  header_spend: {
    marginTop: 48,
    alignItems: "center",
  },
  wrapper_percentage: {
    flexDirection: "row",
    alignItems: "center",
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
