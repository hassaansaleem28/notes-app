import { ID } from "appwrite";
import { account } from "./appwrite";

const accountService = {
  // register a user
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      console.error(error);
      return {
        error: error.message || "Registration failed! Please try again.",
      };
    }
  },
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      console.error(error);
      return {
        error:
          error.message ||
          "Login failed! Please check your credentials and try again.",
      };
    }
  },
  async getLoggedInUser() {
    try {
      return await account.get();
    } catch (error) {
      console.error(error);
      return {
        error: error.message || "Failed to fetch user data.",
      };
    }
  },
  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.error(error);
      return {
        error: error.message || "Logout failed! Please try again.",
      };
    }
  },
};

export default accountService;
