// server.js

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnection from './config/db.js';
import rentalRoutes from './routes/rentals.js';

dotenv.config();
const app = express();


//enable cors
app.use(cors({
    origin: 'https://rental-management-wiv3.vercel.app/', // Allow all domains or specify
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from my backend application!');
  });
  
// 5000 is taken by mac 


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

const PORT = process.env.PORT || 5001;

//start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;