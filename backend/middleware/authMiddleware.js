// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { getDb,connectToServer } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const protect = async (req, res, next) => {
  let token;
  console.log("🛡️  Incoming auth check...");

  try {
    console.log("🔍 Authorization header:", req.headers.authorization);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log("✅ Extracted token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded token:", decoded);
      await connectToServer();
      const db = getDb();
      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });

      if (!user) {
        console.log("❌ User not found");
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = { userId: user._id }; // 👈 只挂上 userId 就够了
      console.log("✅ User authenticated:", req.user);

      next();
    } else {
      console.log("❌ Missing or bad Authorization header");

      return res.status(401).json({ message: 'Not authorized, token missing' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};
