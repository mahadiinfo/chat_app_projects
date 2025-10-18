import mongoose from "mongoose";


const blackListTokenSchema = new mongoose.Schema(
    {

        token: {
            type: String,
            unique: true,
            required: true,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 86400,
        },
    });



const blackListToken = mongoose.model("chatApp_BlackList_token", blackListTokenSchema);
export default blackListToken;
