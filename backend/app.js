
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

dbConnection.connectToServer().then(() => {
    console.log("✅ MongoDB connected");
  
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  export default app;