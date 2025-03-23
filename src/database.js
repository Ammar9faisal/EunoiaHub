import { databases as appwriteDatabases } from "./appwrite";
import { ID } from "appwrite";
import stubDatabase from "./stubDatabase";

const useStubDatabase = import.meta.env.VITE_USE_STUB_DATABASE === 'false';
const databases = useStubDatabase ? stubDatabase : appwriteDatabases;

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
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_ACHIEVEMENTS, // Add achievements
        name: "achievements",
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            databases.createDocument(col.dbId, col.id, id, payload, permissions),

        createUser: (id, payload, permissions) =>
            databases.createDocument(col.dbId, col.id, id, payload, permissions),

        update: (id, payload, permissions) =>
            databases.updateDocument(col.dbId, col.id, id, payload, permissions),

        delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

        list: (queries = []) =>
            databases.listDocuments(col.dbId, col.id, queries),

        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});

export default db;