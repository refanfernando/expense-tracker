import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTransactionContext } from "@/context/TransactionProvider";
import { formatMoney } from "@/utils/Common";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export const TopSpending = () => {
  const date = new Date();

  const {
    state: { transactions },
  } = useTransactionContext();

  const data = transactions
    .filter(
      (x) =>
        x.transactionType === "expenses" &&
        x.date.getFullYear() === date.getFullYear() &&
        x.date.getMonth() === date.getMonth()
    )
    .sort((a, b) => b.total - a.total);

  if (!data.length) return null;

  const navigateToDetails = (id: number) => {
    router.push({
      pathname: "/transaction-details",
      params: {
        id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={{ fontSize: 14 }}>
        Top Spending
      </ThemedText>
      <View>
        {data.splice(0, 5).map((t, idx) => (
          <TouchableOpacity
            onPress={() => navigateToDetails(t.id)}
            key={idx}
            style={styles.list_item}
          >
            <View style={{ marginRight: 12 }}>
              <AntDesign name="barschart" size={24} color="black" />
            </View>
            <View style={{ flex: 1.5 }}>
              <ThemedText style={{ fontSize: 12 }} type="subtitle">
                {t.transactionName}
              </ThemedText>
              <ThemedText style={{ fontSize: 8, color: Colors.codGray }}>
                {t.date.toLocaleDateString()}
              </ThemedText>
            </View>
            <View style={styles.total_spend}>
              <ThemedText
                style={{
                  fontSize: 12,
                  color:
                    t.transactionType === "expenses" ? Colors.amaranth : "#000",
                  marginRight: 6,
                }}
                type="subtitle"
              >
                {formatMoney(t.total)}
              </ThemedText>
              <AntDesign name="right" size={12} color="black" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: "90%",
    marginHorizontal: "auto",
    paddingHorizontal: 14,
    paddingBottom: 12,
    marginBottom: 12,
  },
  list_item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDD",
    paddingBottom: 4,
  },
  total_spend: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper_empty_transaction: {
    paddingTop: 54,
    alignItems: "center",
  },
});
