import { Schema, model } from "mongoose";


const tokenSchema = new Schema({
    btoken:{
        type:String
    }
})


const Token = model("token", tokenSchema)

export default Token