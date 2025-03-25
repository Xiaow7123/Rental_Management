
import dotenv from 'dotenv';
import express from 'express';
import dbConnection from './config/db.js';
import rentalRoutes from './routes/rentals.js';

dotenv.config();
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from my backend application!');
  });
  
// 5000 is taken by mac 

//routes 
app.use('/api', rentalRoutes);

const PORT = process.env.PORT || 5001;

// Vercel will call the exported app — no need to call listen()
await dbConnection.connectToServer()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

export default app;