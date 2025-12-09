import { databases } from "./appwrite";

const databaseService = {
  async listNotes(dbId, tableId) {
    try {
      console.log(databases);
      // const response = await databases.listDocuments(dbId, tableId);
      // console.log(response);
      // return response.documents || [];
    } catch (error) {
      console.error("Error in fetching Documents", error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
