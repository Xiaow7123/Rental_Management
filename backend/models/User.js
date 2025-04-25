import { getDb } from "../config/db.js";
const userSchema =async() => {
    const dbConnect = getDb();
    try{
        await dbConnect.createUserCollection("users", {
            validator: {
                bsonType:"object",
                required:["email","password"],
                properties:{
                    email:{
                        bsonType:"string",
                        description:"must be a string and is required"
                    },
                    password:{
                        bsonType:"string",
                        description:"must be a string and is required"
                    }
                }
            }
        });
    }
    catch(error){
        console.error("Error creating user collection: ", errer);
    }
}

export default userSchema;

