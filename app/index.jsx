import PostItImage from "@/assets/images/post-it.png";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(
    function () {
      if (user && !loading) {
        router.replace("/notes");
      }
    },
    [user, loading]
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text>
          <ActivityIndicator size="large" color="#007bff" />
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Notes app</Text>
      <Text style={styles.subtitle}>
        Capture your thoughts anytime, anywhere.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/notes")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
