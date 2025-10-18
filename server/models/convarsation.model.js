import mongoose from "mongoose";

const convarsation = new mongoose.Schema({

    participend: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],

    message: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"

    }]


}, { timestamps: true });

export default mongoose.model("Convarsation", convarsation);