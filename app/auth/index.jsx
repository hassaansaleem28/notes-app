import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function AuthScreen() {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleAuth() {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    if (isRegistering && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    let response;

    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }
    if (response.error) {
      Alert.alert("Authentication Error", response.error);
      return;
    }
    router.replace("/notes");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? "Sign Up" : "Login"}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="none"
      />
      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          textContentType="none"
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isRegistering ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    outlineStyle: "none",
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    color: "#007bff",
    marginTop: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
  },
});

export default AuthScreen;
