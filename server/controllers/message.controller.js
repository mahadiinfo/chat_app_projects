import { asyncHandler } from "../utilitis/asyncHandeler.utility.js";
import { errorHandler } from "../utilitis/errorHandeler.utility.js";
import Message from "../models/message.model.js";
import Convarsation from "../models/convarsation.model.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res, next) => {


    const senderId = req.user._id;
    const reciverId = req.params.reciverId;
    const message = req.body.message;


    if (!senderId || !reciverId || !message) {
        return next(new errorHandler('all field are required', 400))
    }

    let convarsation = await Convarsation.findOne({
        participend: { $all: [senderId, reciverId] }

    });

    if (!convarsation) {
        convarsation = await Convarsation.create({
            participend: [senderId, reciverId],

        })
    }

    const newMessage = await Message.create({
        senderId,
        reciverId,
        message,
    });

    if (newMessage) {
        convarsation.message.push(newMessage._id)
        await convarsation.save();

    }

    // socket.io
    const socketId = getSocketId(reciverId)
    io.to(socketId).emit("newMessage", newMessage)




    res.status(200).json({
        success: true,
        responseData: newMessage,
    })
});


export const getMessage = asyncHandler(async (req, res, next) => {


    const myId = req.user._id;
    const otherParticipentsID = req.params.otherParticipentsID;


    if (!myId || !otherParticipentsID) {
        return next(new errorHandler('all field are required', 400))
    }

    let convarsation = await Convarsation.findOne({
        participend: { $all: [myId, otherParticipentsID] }

    }).populate("message")


    res.status(200).json({
        success: true,
        responseData: convarsation,
    })
});