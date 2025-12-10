import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    checkUser();
  }, []);

  const checkUser = async function () {
    setLoading(true);
    const response = await authService.getLoggedInUser();
    if (response.error) {
      setUser(null);
    } else {
      setUser(response);
    }
    setLoading(false);
  };
  const login = async function (email, password) {
    const response = await authService.login(email, password);
    if (response?.error) {
      return response;
    }
    await checkUser();
    return { success: true };
  };
  const register = async function (email, password) {
    const response = await authService.register(email, password);
    if (response?.error) {
      return response;
    }
    return login(email, password);
  };
  const logout = async function () {
    await authService.logout();
    setUser(null);
    await checkUser();
  };
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
