
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {connectToServer} from './config/db.js';
import rentalRoutes from './routes/rentals.js';
import authRoutes from './routes/auth.js';
import userSchema from './models/User.js';

dotenv.config();
const app = express();
app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
));


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from my backend application!');
  });
  
// 5000 is taken by mac 

//routes 
app.use('/api/auth', authRoutes);
app.use('/api/rentals', rentalRoutes);


const PORT = process.env.PORT || 5001;

// Vercel will call the exported app — no need to call listen()
(async () => {
  try {
    await connectToServer();
    await userSchema();
   
    console.log('✅ MongoDB connected')
} catch(error) {
    console.error('❌ MongoDB connection error:', error);
}
})();

export default app;