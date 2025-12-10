import * as Appwrite from "appwrite";
import { databases } from "./appwrite";

const databaseService = {
  // LIST DOCUMENTS
  async listDocuments(dbId, tableId, queries = []) {
    try {
      const response = await databases.listDocuments(dbId, tableId, queries);
      return { data: response.documents || [], error: null };
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
        data,
        [
          Appwrite.Permission.read(Appwrite.Role.any()),
          Appwrite.Permission.write(Appwrite.Role.any()),
        ]
      );
    } catch (error) {
      console.error("Error creating document:", error.message);
      return { error: error.message };
    }
  },
  // UPDATE DOCUMENTS
  async updateDocument(dbId, tableId, documentId, data) {
    try {
      return await databases.updateDocument(dbId, tableId, documentId, data);
    } catch (error) {
      console.error("Error updating document:", error.message);
      return { error: error.message };
    }
  },
  // DELETE DOCUMENTS
  async deleteDocument(dbId, tableId, documentId) {
    try {
      await databases.deleteDocument(dbId, tableId, documentId);
      return { success: true };
    } catch (error) {
      console.error("Error deleting document:", error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
