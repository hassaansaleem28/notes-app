import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#e0770f",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
        },
        contentStyle: {
          paddingHorizontal: 20,
          paddingTop: 10,
          backgroundColor: "#f2fff2",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
    </Stack>
  );
}
