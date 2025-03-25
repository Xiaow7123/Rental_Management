// server.js

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConnection from './config/db.js';
import rentalRoutes from './routes/rentals.js';




const app = express();


app.get('/', (req, res) => {
    res.send('Hello from my backend application!');
  });
  
// 5000 is taken by mac 
const PORT = process.env.PORT || 5001;
//parse json request 
app.use(express.json());

//enable cors
app.use(cors({
    origin: 'https://rental-management-wiv3.vercel.app/', // Allow all domains or specify
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


//routes 
app.use('/api', rentalRoutes);

//start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;