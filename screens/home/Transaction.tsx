import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { formatMoney } from "@/utils/Common";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTransactionContext } from "@/context/TransactionProvider";
import { Link, router } from "expo-router";

export default function Header() {
  const {
    state: { transactions },
  } = useTransactionContext();

  const renderTitle = (() => (
    <View style={styles.title_transaction}>
      <ThemedText style={{ color: Colors.codGray }}>
        RECENT TRANSACTION
      </ThemedText>
      <View style={styles.navigate_button}>
        <Link href="/transactions">
          <ThemedText
            style={{ fontSize: 14, color: Colors.junggleGreen, marginRight: 4 }}
            type="subtitle"
          >
            See All
          </ThemedText>
          <AntDesign name="arrowright" size={18} color="green" />
        </Link>
      </View>
    </View>
  ))();

  const navigateToPageDetails = (id: number) => {
    router.push({
      pathname: "/transaction-details",
      params: {
        id,
      },
    });
  };

  const renderListItem = (() => {
    return (
      <ScrollView style={styles.wrapper_list}>
        {[...transactions]
          .toReversed()
          .splice(0, 5)
          .map((t, idx) => (
            <TouchableOpacity
              onPress={() => navigateToPageDetails(t.id)}
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
                      t.transactionType === "expenses"
                        ? Colors.amaranth
                        : "#000",
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
      </ScrollView>
    );
  })();

  const renderNoTransaction = (
    <View style={styles.wrapper_empty_transaction}>
      <ThemedText style={{ color: Colors.codGray }} type="subtitle">
        NO TRANSACTION
      </ThemedText>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!transactions.length ? (
          renderNoTransaction
        ) : (
          <>
            {renderTitle}
            {renderListItem}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.wildSand,
  },
  content: {
    paddingTop: 52,
    paddingHorizontal: "5%",
  },
  title_transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigate_button: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper_list: {
    marginTop: 18,
    marginBottom: 40,
    backgroundColor: Colors.white,
  },
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
  wrapper_empty_transaction: {
    paddingTop: 54,
    alignItems: "center",
  },
});
