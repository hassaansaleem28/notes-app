import { ID } from "appwrite";
import databaseService from "./databaseService";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const tableId = process.env.EXPO_PUBLIC_APPWRITE_TABLE_NOTES_ID;

const notesService = {
  async fetchNotes() {
    const response = await databaseService.listDocuments(dbId, tableId);
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },

  async createNote(text) {
    if (!text || text.trim() === "") {
      return { error: "Note text cannot be empty." };
    }
    const response = await databaseService.createDocument(
      dbId,
      tableId,
      ID.unique(),
      { text }
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
