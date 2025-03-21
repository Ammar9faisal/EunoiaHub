import { Client, Account, ID, Databases} from "appwrite";

const client = new Client();  // Initialize the Appwrite
client  // Set the project ID and endpoint
    .setProject(import.meta.env.VITE_PROJECT_ID)
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT);

const account = new Account(client);
const databases = new Databases(client);


export { client, account, ID, databases};