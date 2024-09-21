import { SelectDate } from "@/components/SelectDate";
import { SelectField } from "@/components/SelectField";
import { TextInputField } from "@/components/TextInputField";
import { Colors } from "@/constants/Colors";
import { TRANSACTION_TYPE } from "@/constants/Common";
import { useTransactionContext } from "@/context/TransactionProvider";
import { convertToNumber } from "@/utils/Common";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";

type FormSubmited = {
  date: Date;
  total: string;
  note: undefined | string;
  transactionName: string;
  transactionType: "income" | "expenses";
};

export default function FormInputTransaction() {
  const {
    state: { transactions },
  } = useTransactionContext();
  const { id } = useLocalSearchParams();

  let screenHeight = Dimensions.get("window").height;
  const { dispatch } = useTransactionContext();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const findItem = transactions.find((x) => +x.id === +id);
    if (findItem) {
      setValue("total", `${findItem.total}`);
      setValue("transactionName", findItem.transactionName);
      setValue("date", findItem.date);
      setValue("transactionType", findItem.transactionType);
      setValue("note", findItem.note);
    }
  }, [id]);

  const onSubmit = (data: any) => {
    const formData = data as FormSubmited;
    const payload = {
      ...formData,
      id: data.date.toLocaleDateString().split("/").join(""),
      total: convertToNumber(formData.total),
    };
    dispatch({ type: "ADD_TRANSACTION", payload });
    control._reset();
    ToastAndroid.show("Successfully", ToastAndroid.SHORT);
    router.replace("/(tabs)");
  };

  const onUpdate = (data: any) => {
    const formData = data as FormSubmited;
    const payload = {
      ...formData,
      id: +id,
      total: convertToNumber(formData.total),
    };
    dispatch({ type: "UPDATE_TRANSACTION", payload });
    ToastAndroid.show("Successfully", ToastAndroid.SHORT);
    router.back();
  };

  const onDelete = () => {
    dispatch({ type: "REMOVE_TRANSACTION", payload: +id });
    ToastAndroid.show("Successfully", ToastAndroid.SHORT);
    router.back();
  };

  const renderHeader = (() => {
    if (id)
      return (
        <View style={styles.header_update}>
          <View style={styles.wrapper_button}>
            <Button
              color={Colors.junggleGreen}
              title="Update"
              onPress={handleSubmit(onUpdate)}
            />
            <Button color={Colors.amaranth} title="Delete" onPress={onDelete} />
          </View>
        </View>
      );

    return (
      <View style={styles.header}>
        <View style={styles.wrapper_button}>
          <Button
            color={Colors.junggleGreen}
            title="Save"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    );
  })();

  return (
    <View style={{ height: screenHeight - 50, backgroundColor: "white" }}>
      {renderHeader}
      <ScrollView>
        <View style={styles.main}>
          <TextInputField
            control={control}
            errors={errors}
            isRequired={true}
            style={styles.text_input}
            label="Total"
            name="total"
            placeholder="Total"
            formatNumber
            keyboardType="numeric"
          />
          <TextInputField
            control={control}
            errors={errors}
            isRequired={true}
            style={styles.text_input}
            label="Transaction name"
            name="transactionName"
            placeholder="Transaction name"
          />
          <SelectDate
            label="Date"
            name="date"
            isRequired
            errors={errors}
            control={control}
            style={styles.text_input}
          />
          <SelectField
            mode="dropdown"
            label="Transaction Type"
            name="transactionType"
            isRequired
            errors={errors}
            control={control}
            options={TRANSACTION_TYPE}
            style={styles.text_input}
          />
          <TextInputField
            control={control}
            errors={errors}
            style={styles.text_input}
            name="note"
            placeholder="Note"
            label="Note"
            editable={true}
            multiline={true}
            numberOfLines={4}
            maxLength={40}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    backgroundColor: Colors.white,
  },
  main: {
    backgroundColor: Colors.white,
    padding: 12,
  },
  text_input: {
    marginBottom: 12,
  },
  wrapper_button: {
    alignSelf: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
  },
  header: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 42,
    paddingHorizontal: 8,
  },
  header_update: {
    justifyContent: "flex-end",
    marginTop: 4,
    flexDirection: "row",
    paddingHorizontal: 12,
  },
});
