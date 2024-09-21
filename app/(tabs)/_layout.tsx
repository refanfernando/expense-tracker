import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Keyboard } from "react-native";
import { useState } from "react";

export default function Home() {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  Keyboard.addListener("keyboardDidShow", () => setIsKeyboardShow(true));
  Keyboard.addListener("keyboardDidHide", () => setIsKeyboardShow(false));

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-transaction"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"add-circle-sharp"}
              color={"green"}
              style={
                !isKeyboardShow && {
                  fontSize: 60,
                  height: 60,
                  bottom: 5,
                }
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "transaction",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "wallet" : "wallet-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
