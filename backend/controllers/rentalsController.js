//Business logic for handling rentals
import dbConnection from '../config/db.js';
import { ObjectId } from 'mongodb';
//This function retrieves all rental properties from the database or a filtered list based on certain criteria
const listRentals = async (req, res) => {
    const dbConnect = dbConnection.getDb();
    try {
        const rentals = await dbConnect.collection("rentals").find({}).toArray();
        res.status(200).json(rentals);
    } catch (error) {
        console.error("Error retrieving rentals:", error);
        res.status(500).json({ message: "Error retrieving rentals" });
    }
};


// get rental by id
const getRentalById = async (req, res) => {
    const dbConnect = dbConnection.getDb();
    const rentalId = req.params.id;
    try {
        const rental = await dbConnect.collection("rentals").findOne({ _id: new ObjectId(rentalId) });
        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }
        res.status(200).json(rental);
    } catch (error) {
        console.error("Error retrieving rental:", error);
        res.status(500).json({ message: "Error retrieving rental" });
    }
};

// create rental
// This function creates a new rental property in the database
const createRental = async (req, res) => {
    const dbConnect = dbConnection.getDb();
    const newRental = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
        console.error("Error: No data provided");
        return res.status(400).json({ message: "No data provided" });
    }
    
    try {
        const result = await dbConnect.collection("rentals").insertOne(newRental);
        console.log("Received data:", req.body);

        if (result.acknowledged) {
            // If the insert was acknowledged, fetch the inserted document using the insertedId
            const insertedDocument = await dbConnect.collection("rentals").findOne({_id: result.insertedId});
            res.status(201).json(insertedDocument);
        } else {
            res.status(500).json({ message: "Rental insertion not acknowledged" });
        }
    } catch (error) {
        console.error("Error creating rental:", error);
        res.status(500).json({ message: "Error creating rental", error: error.toString() });
    }
}

// update rental
// This function updates an existing rental property in the database
const updateRental = async (req, res) => {
    const dbConnect = dbConnection.getDb();
    const rentalId = req.params.id;
    const updatedRental = req.body;
    try {
        const result = await dbConnect.collection("rentals").updateOne({ _id: new ObjectId(rentalId) }, { $set: updatedRental });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Rental not found" });
        }
        res.status(200).json({ message: "Rental updated successfully" });
    } catch (error) {
        console.error("Error updating rental:", error);
        res.status(500).json({ message: "Error updating rental" });
    }
}

// delete rental
// This function deletes a rental property from the database
const deleteRental = async (req, res) => {
    const dbConnect = dbConnection.getDb();
    const rentalId = req.params.id;
    try {
        const result = await dbConnect.collection("rentals").deleteOne({ _id: new ObjectId(rentalId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Rental not found" });
        }
        res.status(200).json({ message: "Rental deleted successfully" });
    } catch (error) {
        console.error("Error deleting rental:", error);
        res.status(500).json({ message: "Error deleting rental" });
    }
}

//count total rentals 
const getTotalRentals = async (req, res) => {
    const dbConnect = dbConnection.getDb();
    try {
        const totalRentals = await dbConnect.collection("rentals").countDocuments();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ totalRentals });
    } catch (error) {
        console.error("Error counting rentals:", error);
        res.status(500).json({ message: "Error counting rentals" });
    }
}


// Export the functions to be used in the routes
export default {
    listRentals,
    getRentalById,
    createRental,
    updateRental,
    deleteRental,
    getTotalRentals
};