// Routes for handling rental-related requests
import express from 'express';
import rentalsController from '../controllers/rentalsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//define routes
router.get('/list', protect,rentalsController.listRentals); // Get all rentals
router.get('/total',protect,rentalsController.getTotalRentals); // Get total rentals
router.post('/create', protect,rentalsController.createRental); // Create a new rental

router.get('/compare',protect, rentalsController.getRentalsByIds); // Compare rentals

router.get('/:id',protect,rentalsController.getRentalById); // Get a rental by ID
router.put('/update/:id', protect,rentalsController.updateRental); // Update a rental by ID
router.delete('/delete/:id', protect,rentalsController.deleteRental); // Delete a rental by ID
export default router;