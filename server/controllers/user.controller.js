import blackListToken from "../models/blackListToken.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utilitis/asyncHandeler.utility.js";
import { errorHandler } from "../utilitis/errorHandeler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { fullname, number, password, gender } = req.body;
  if (!fullname || !number || !password || !gender) {
    return next(new errorHandler("all fields are required", 400));
  }

  const user = await User.findOne({ number });
  if (user) {
    return next(new errorHandler("user alredy exists", 400));
  }

  if (password.length < 6) {
    return next(new errorHandler("Password must be 6 degits", 400));
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const avatartype = gender === "male" ? "boy" : "girl";

  const avatar = `https://avatar.iran.liara.run/public/${avatartype}?username=${number}`;

  const newUser = await User.create({
    fullname,
    number,
    password: hashedpassword,
    gender,
    avatar,
  });

  const tokenData = {
    _id: newUser?._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        newUser,
        token,
        message: "Signup Successfull!",
      },
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { number, password } = req.body;
  if (!number || !password) {
    return next(
      new errorHandler("please enter a valid number or password", 400)
    );
  }

  const user = await User.findOne({ number });
  if (!user) {
    return next(
      new errorHandler("please enter a vallid number or password", 400)
    );
  }

  const isvallidPassword = await bcrypt.compare(password, user.password);
  if (!isvallidPassword) {
    return next(
      new errorHandler("please enter a vallid number or password", 400)
    );
  }

  const tokenData = {
    _id: user?._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        user,
        token,
        message: "Login Successfull!",
      },
    });
});

export const userPasschange = asyncHandler(async (req, res, next) => {
  const { number, oldPassword, newPassword } = req.body;

  if (!number || !oldPassword || !newPassword) {
    return next(
      new errorHandler(
        "All fields (number, oldPassword, newPassword) are required",
        400
      )
    );
  }

  if (newPassword.length < 6) {
    return next(
      new errorHandler("New password must be at least 6 characters long", 400)
    );
  }

  if (oldPassword === newPassword) {
    return next(
      new errorHandler(
        "New password cannot be the same as the old password",
        400
      )
    );
  }

  const user = await User.findOne({ number });
  if (!user) {
    return next(new errorHandler("Invalid user number or password", 400));
  }
  const isvallidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isvallidPassword) {
    return next(new errorHandler("Wrong password", 400));
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedNewPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully!",
  });
});

export const userProfilechange = asyncHandler(async (req, res, next) => {
  const { number, fullname, newnumber } = req.body;

  if (!fullname || !number) {
    return next(new errorHandler("All fields are required", 400));
  }

  if (!/^[0-9]{11}$/.test(newnumber)) {
    return next(new errorHandler(" please enter a 11 degit number", 400));
  }

  const user = await User.findOne({ number });
  if (!user) {
    return next(new errorHandler("Invalid user number", 400));
  }

  user.fullname = fullname;
  user.number = newnumber;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Edit successfully!",
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const userID = req.user._id;

  const profile = await User.findById(userID);

  res.status(200).json({
    success: true,
    responseData: profile,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.replace('Bearer', "");
  await blackListToken.create({ token })

  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
    });
});
export const userAvatarChange = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    if (req.file) {
        user.avatar = req.file.path; // Cloudinary URL
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "Avatar updated successfully!",
        responseData: user,
    });
});

export const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUser = await User.find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    success: true,
    responseData: otherUser,
  });
});
