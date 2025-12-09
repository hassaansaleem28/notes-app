import databaseService from "./databaseService";

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const tableId = process.env.EXPO_PUBLIC_APPWRITE_TABLE_NOTES_ID;

const notesService = {
  async fetchNotes() {
    const response = await databaseService.listNotes(dbId, tableId);
    if (response.error) {
      return { error: response.error };
    }
    console.log(response);
    return { data: response };
  },
};

export default notesService;
