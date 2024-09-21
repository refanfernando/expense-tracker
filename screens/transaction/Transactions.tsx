import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTransactionContext } from "@/context/TransactionProvider";
import { formatMoney } from "@/utils/Common";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

export const Transactions = () => {
  const {
    state: { transactions },
  } = useTransactionContext();

  const navigateToDetails = (id: number) => {
    router.push({
      pathname: "/transaction-details",
      params: {
        id,
      },
    });
  };

  return (
    <View>
      {[...transactions]
        .toReversed()
        .splice(0, 5)
        .map((t, idx) => (
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
  );
};

const styles = StyleSheet.create({
  list_item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDD",
    margin: 12,
    paddingBottom: 4,
  },
  total_spend: {
    flexDirection: "row",
    alignItems: "center",
  },
});
