import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function HeaderLogout() {
  const { user, logout } = useAuth();

  return user ? (
    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
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
          headerRight: () => <HeaderLogout />,
          contentStyle: {
            paddingHorizontal: 20,
            paddingTop: 10,
            backgroundColor: "#f2fff2",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        <Stack.Screen
          name="auth"
          options={{ headerTitle: "Login / Sign Up" }}
        />
      </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#ff3b30",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
