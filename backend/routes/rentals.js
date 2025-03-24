// Routes for handling rental-related requests
import express from 'express';
import rentalsController from '../controllers/rentalsController.js';

const router = express.Router();

//define routes
router.get('/rentals/list', rentalsController.listRentals); // Get all rentals
router.get('/rentals/total',rentalsController.getTotalRentals); // Get total rentals
router.post('/rentals/create', rentalsController.createRental); // Create a new rental
router.get('/rentals/:id', rentalsController.getRentalById); // Get a rental by ID
router.put('/rentals/update/:id', rentalsController.updateRental); // Update a rental by ID
router.delete('/rentals/delete/:id', rentalsController.deleteRental); // Delete a rental by ID

export default router;