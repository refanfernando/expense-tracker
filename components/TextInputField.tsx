import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
} from "react-hook-form";
import {
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  TextStyle,
  TextInputProps,
} from "react-native";

type Props = {
  getValues?: UseFormGetValues<FieldValues>;
  control: Control<FieldValues, any>;
  errors?: FieldErrors<FieldValues>;
  name: string;
  msgError?: string;
  label?: string;
  isRequired?: boolean;
  formatNumber?: boolean;
  style?: StyleProp<TextStyle>;
} & TextInputProps;

export const TextInputField = ({
  control,
  getValues,
  errors,
  name,
  msgError = "Field is required",
  isRequired = false,
  style,
  label,
  formatNumber = false,
  ...rest
}: Props) => {
  const handleFormatNumber = (text: string) => {
    if (!text) return;
    const formatIntl = new Intl.NumberFormat("id-ID");
    const match = text.match(/\d+/g);
    if (match) {
      const number = match.join("");
      return formatIntl.format(+number);
    }
    return text;
  };

  return (
    <SafeAreaView style={style}>
      {label && <Text>{label}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          const val = formatNumber ? handleFormatNumber(value) : value;
          return (
            <TextInput
              onBlur={onBlur}
              onChangeText={(text) =>
                formatNumber
                  ? onChange(handleFormatNumber(text))
                  : onChange(text)
              }
              value={val}
              style={[
                styles.input,
                errors?.[name] ? styles.red_border : styles.gray_border,
              ]}
              {...rest}
            />
          );
        }}
        name={name}
        rules={{ required: isRequired }}
      />
      {errors?.[name] && <Text style={styles.errorText}>{msgError}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
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
