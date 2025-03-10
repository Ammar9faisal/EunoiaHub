class StubDatabase {
    constructor() {
        this.collections = {
            users: [],
            surveyResponses: [],
            todoLists: [],
            visionboard: []
        };
    }

    getCollection(collectionId) {
        const collection = this.collections[collectionId];
        if (!collection) {
            throw new Error(`Collection ${collectionId} does not exist`);
        }
        return collection;
    }

    async createDocument(dbId, collectionId, id, payload, permissions) {
        const collection = this.getCollection(collectionId);
        const document = { ...payload, $id: id, permissions };
        collection.push(document);
        return document;
    }

    async updateDocument(dbId, collectionId, id, payload, permissions) {
        const collection = this.getCollection(collectionId);
        const index = collection.findIndex(doc => doc.$id === id);
        if (index !== -1) {
            collection[index] = { ...collection[index], ...payload, permissions };
            return collection[index];
        }
        throw new Error('Document not found');
    }

    async deleteDocument(dbId, collectionId, id) {
        const collection = this.getCollection(collectionId);
        this.collections[collectionId] = collection.filter(doc => doc.$id !== id);
        return { $id: id };
    }

    async listDocuments(dbId, collectionId, queries) {
        const collection = this.getCollection(collectionId);
        return {
            documents: collection.filter(doc => {
                return queries.every(query => {
                    const [field, operator, value] = query;
                    if (operator === 'equal') {
                        return doc[field] === value;
                    }
                    return true;
                });
            })
        };
    }

    async getDocument(dbId, collectionId, id) {
        const collection = this.getCollection(collectionId);
        return collection.find(doc => doc.$id === id);
    }

    async deleteAll(collectionId) {
        const collection = this.getCollection(collectionId);
        this.collections[collectionId] = [];
    }
}

const stubDatabase = new StubDatabase();
export default stubDatabase;