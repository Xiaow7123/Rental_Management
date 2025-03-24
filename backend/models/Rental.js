// Schema and model definition for Rental entity

const createRentalCollection = async () => {
    const dbConnect = mongoUtil.getDb();
    try{
        await dbConnect.createRentalCollection("rentals", {
            validator: {
                bsonType:"object",
                required:["name","city","state","country","PropertyType","contactInofor","concerns","highlights","price","squarefeet","Amenities","officalWebsite","images"],
                properties:{
                    name:{
                        bsonType:"string",
                        description:"must be a string and is required"
                    },
                    city:{
                        bsonType:"string",
                        description:"must be a string and is required"
                    },
                    state:{
                        bsonType:"string",
                        description:"must be a string and is required"
                    },
                    country:{
                        bsonType:"string",
                        description:"must be a string and is required"
                    },
                    PropertyType:{
                        bsonType:"string",
                        description:"must be a string and is required"
                    },
                    contactInfo:{
                        bsonType:"object",
                        properties:{
                            email:{
                                bsonType:"string",
                                description:"must be a string and is required"
                            },
                            phone:{
                                bsonType:"string",
                                description:"must be a string and is required"
                            }
                        }
                    },
                    concerns:{
                        bsonType:"array",
                        items:{
                            bsonType:"string"
                        }
                    },
                    highlights:{
                        bsonType:"array",
                        items:{
                            bsonType:"string"
                        }
                    },
                    price:{
                        bsonType:"number",
                        description:"must be a number and is required"
                    },
                    squarefeet:{
                        bsonType:"number",
                        description:"must be a number and is required"
                    },
                    Amenities:{
                        bsonType:"array",
                        items:{
                            bsonType:"string"
                        }
                    },
                    officalWebsite:{
                        bsonType:"string",
                        description:"must be a string and is required"
                    },
    
                }
            }
        });
        console.log("Rental collection created successfully");
    }
    catch (error) {
        console.error("Error creating rental collection:", error);
    }
}

createRentalCollection();