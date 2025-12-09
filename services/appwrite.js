import { Client, Databases } from "appwrite";
import { Platform } from "react-native";

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    notes: process.env.EXPO_PUBLIC_APPWRITE_TABLE_NOTES_ID,
  },
};
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

switch (Platform.OS) {
  case "ios":
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);
    break;
  case "android":
    client.setPackageName(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
    break;
  default:
    break;
}

const databases = new Databases(client);

export { client, config, databases };
