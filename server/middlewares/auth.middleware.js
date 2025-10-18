import blackListToken from "../models/blackListToken.model.js";
import { asyncHandler } from "../utilitis/asyncHandeler.utility.js";
import { errorHandler } from "../utilitis/errorHandeler.utility.js";
import jwt from "jsonwebtoken"


export const isAuthenticated = asyncHandler(async (req, res, next) => {

    const token = req.cookies.token || req.headers['authorization']?.replace('Bearer', "");
    const tokencheack = await blackListToken.findOne({ token })

    if (!token) {
        return next(new errorHandler('invallid token', 400));
    }
    if (tokencheack) {
        return next(new errorHandler('invallid token', 400));
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = tokenData;
    next();


});