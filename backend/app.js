// server.js

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConnection from './config/db.js';
import rentalRoutes from './routes/rentals.js';
import { validatePathMiddleware } from './middleware/middleware.js';



const app = express();
// 5000 is taken by mac 
const PORT = process.env.PORT || 5001;
//parse json request 
app.use(express.json());

//enable cors
app.use(cors({
    origin: 'http://localhost:3000', // Allow all domains or specify
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
// connet to mongoDB
(async () => {
    try {
        await dbConnection.connectToServer();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    })();

app.use('/total', validatePathMiddleware);
//routes 
app.use('/api', rentalRoutes);

//start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;