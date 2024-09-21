import { Controller, FieldErrors, FieldValues } from "react-hook-form";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  TextStyle,
  View,
} from "react-native";
import { Picker, PickerProps } from "@react-native-picker/picker";

type Props = {
  control: any;
  errors?: FieldErrors<FieldValues>;
  name: string;
  msgError?: string;
  label?: string;
  isRequired?: boolean;
  style?: StyleProp<TextStyle>;
  options?: {
    value: string | null;
    label: string;
  }[];
} & PickerProps;

export const SelectField = ({
  control,
  errors,
  name,
  msgError = "Field is required",
  isRequired = false,
  style,
  label,
  options,
  ...rest
}: Props) => {
  return (
    <SafeAreaView style={style}>
      {label && <Text>{label}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              styles.input,
              errors?.[name] ? styles.red_border : styles.gray_border,
            ]}
          >
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              onBlur={onBlur}
              style={styles.picker}
              {...rest}
            >
              {options?.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  style={{ fontSize: 14 }}
                />
              ))}
            </Picker>
          </View>
        )}
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
  picker: {
    marginHorizontal: -10,
  },
});
