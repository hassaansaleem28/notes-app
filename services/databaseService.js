import * as Appwrite from "appwrite";
import { databases } from "./appwrite";

const databaseService = {
  // LIST DOCUMENTS
  async listDocuments(dbId, tableId) {
    try {
      const response = await databases.listDocuments(dbId, tableId, [
        Appwrite.Query.limit(1000),
        Appwrite.Query.orderDesc("$createdAt"),
      ]);
      return response.documents || [];
    } catch (error) {
      console.error("Error in fetching Documents", error.message);
      return { error: error.message };
    }
  },
  // CREATE DOCUMENTS
  async createDocument(dbId, tableId, id = null, data) {
    try {
      return await databases.createDocument(
        dbId,
        tableId,
        id ?? "unique()",
        data
      );
    } catch (error) {
      console.error("Error creating document:", error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
