import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb,connectToServer } from '../config/db.js';

// Register a new user
const register = async (req, res) => {
  await connectToServer();

  const db = getDb();
  const usersCollection = db.collection('users');
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = {
      email,
      password: hashedPassword
    };
    
    await usersCollection.insertOne(newUser);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    await connectToServer();
    const db = getDb();

    const { email, password } = req.body;
    
    // Check if user exists
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRE || '1d' });
};


// Get current user
const getCurrentUser = async (req, res) => {
  try {
  await connectToServer();
    
  const db = getDb();
  const { userId } = req.user;
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }
  // Don't send the password
  const { password, ...userWithoutPassword } = user;
  return res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { register, login, getCurrentUser };