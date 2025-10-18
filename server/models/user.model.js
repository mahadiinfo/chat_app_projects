import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    number: {
        type: String,
        unique: true,
        required: true,
        

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,

    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;