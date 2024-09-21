import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  useWatch,
} from "react-hook-form";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  TextStyle,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  getValues?: UseFormGetValues<FieldValues>;
  control: Control<FieldValues, any>;
  errors?: FieldErrors<FieldValues>;
  name: string;
  msgError?: string;
  label?: string;
  isRequired?: boolean;
  style?: StyleProp<TextStyle>;
  options?: {
    value: string;
    label: string;
  }[];
};

export const SelectDate = ({
  control,
  errors,
  getValues,
  name,
  msgError = "Field is required",
  isRequired = false,
  style,
  label,
  options,
  ...rest
}: Props) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<undefined | Date>();

  const dateField = useWatch({ name, control });

  useEffect(() => {
    setDate(dateField);
  }, [dateField]);

  const handleOnChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate); // Update state
    }
    setShow(false);
  };

  return (
    <SafeAreaView style={style}>
      {label && <Text>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity
              style={[
                styles.input,
                errors?.[name] ? styles.red_border : styles.gray_border,
              ]}
              onPress={() => setShow(true)}
            >
              <Text>{date?.toLocaleDateString() || "Select Date"}</Text>
              <TextInput
                style={{ display: "none" }}
                onBlur={onBlur}
                value={value || date} // Pass the value to the hidden input
                {...rest}
              />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="datePicker"
                mode="date"
                value={date || new Date()}
                display="spinner"
                onChange={(event, selectedDate) => {
                  handleOnChange(event, selectedDate);
                  if (selectedDate) {
                    onChange(selectedDate); // Update the form field with the new date
                  }
                }}
              />
            )}
          </>
        )}
      />
      {errors?.[name] && <Text style={styles.errorText}>{msgError}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  red_border: {
    borderColor: "red",
  },
  gray_border: {
    borderColor: "gray",
  },
  errorText: {
    color: "red",
  },
});
