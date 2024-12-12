import mongoose from "mongoose";
import constants from "../utils/constants"
import {LOCAL_URL,URI} from "../types/database"


const databaseConnection = async(LOCAL_URL:LOCAL_URL)=>{
    const URI:URI = LOCAL_URL

    await mongoose.connect(URI).then(()=>{
        console.log(constants.message.dbconnect)
    }).catch((err:any)=>{
        console.log(err)
    })
}


export default databaseConnection;