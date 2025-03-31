import { databases as appwriteDatabases} from "./appwrite";
import { ID } from "appwrite";
import stubDatabase from "./stubDatabase";

const useStubDatabase = import.meta.env.VITE_USE_STUB_DATABASE === 'false'; //abbstracts the database to use the stub database if the environment variable is set to true
const databases = useStubDatabase ? stubDatabase : appwriteDatabases;

//This file contains shorthand wrappers to be used to interact with the Appwrite database.
//It contains methods to create, update, delete, list, and get documents from the database.
const db = {};
const collections = [
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_USERS,
        name: "users",
    },
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_SURVEYRESPONSES,
        name: "surveyResponses",
    },
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_TODOLISTS,
        name: "todoLists",
    },
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_VISIONBOARDS,
        name: "visionboard",
    },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cdaa298 (added streaks to the project)
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_STREAKS,
        name: "streaks",
    },
<<<<<<< HEAD
=======
>>>>>>> d3f6374 (Revert "Achivements implementation")
=======
>>>>>>> cdaa298 (added streaks to the project)
];
collections.forEach((col) => {  //wrapper for the database methods to simplify the interaction with the Appwrite database
    db[col.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        createUser: (id, payload, permissions) =>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            databases.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

        list: (queries = []) =>
            databases.listDocuments(col.dbId, col.id, queries),

        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});

export default db;