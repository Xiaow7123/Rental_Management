import { MongoClient } from 'mongodb';

let dbConnection;
let client;

const connectToServer = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("❗MONGODB_URI is not defined. Please check your environment variables.");
        }
        client = await MongoClient.connect(uri);
        dbConnection = client.db();
        console.log("Successfully connected to MongoDB.");
        return dbConnection;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

const getDb = () => {
    if (!dbConnection) {
        throw new Error("Database not initialized. Call connectToServer first.");
    }
    return dbConnection;
};

const closeConnection = async () => {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}
export default { connectToServer, getDb, closeConnection };
