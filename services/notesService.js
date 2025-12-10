import { ID, Query } from "appwrite";
import databaseService from "./databaseService";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const tableId = process.env.EXPO_PUBLIC_APPWRITE_TABLE_NOTES_ID;

const notesService = {
  async fetchNotes(user_id) {
    if (!user_id) {
      console.error("User ID is required to fetch notes");
      return { data: [], error: "User Id is missing!" };
    }
    try {
      const response = await databaseService.listDocuments(dbId, tableId, [
        Query.equal("user_id", user_id),
      ]);
      return response;
    } catch (error) {
      console.log("Error fetching notes: ", error.message);
      return { data: [], error: error.message };
    }
  },

  async createNote(text, user_id) {
    if (!text || text.trim() === "") {
      return { error: "Note text cannot be empty." };
    }
    const response = await databaseService.createDocument(
      dbId,
      tableId,
      ID.unique(),
      { text, user_id }
    );
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  async updateNote(noteId, newText) {
    if (!newText || newText.trim() === "") {
      return { error: "Note text cannot be empty." };
    }
    const response = await databaseService.updateDocument(
      dbId,
      tableId,
      noteId,
      { text: newText }
    );
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  async deleteNote(noteId) {
    const response = await databaseService.deleteDocument(
      dbId,
      tableId,
      noteId
    );
    if (response.error) {
      return { error: response.error };
    }
    return { success: true };
  },
};

export default notesService;
