import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosIns } from "../../components/utilities/axios.instanche";


export const userLoginThunk = createAsyncThunk(
  "user/login",
  async ({ number, password }, { rejectWithValue }) => {
    try {
      const response = await axiosIns.post("/user/login", {
        number,
        password,
      });
      const successOutput = response.data.responseData.message;
      toast.success(successOutput);
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
export const userPassChangeThunk = createAsyncThunk(
  "user/user@pasword-change",
  async ({ number, oldPassword,newPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosIns.post("/user/user@pasword-change", {
        number,
        oldPassword,
        newPassword
      });
      const sucmsg = response?.data?.message 
      toast.success(sucmsg);
      return response;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
export const userProfilechangeThunk = createAsyncThunk(
  "user/user-Profile-change",
  async ({number, fullname, newnumber }, { rejectWithValue }) => {
    try {
      const response = await axiosIns.post("/user/user-Profile-change", {
        number,        
        fullname,
        newnumber,
      });
      const sucmsg = response?.data?.message 
      toast.success(sucmsg);
      return response;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const userAvatarChangeThunk = createAsyncThunk(
  "user/user-avatar-change",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosIns.post("/user/user-avatar-change", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const sucmsg = response?.data?.message;
      toast.success(sucmsg);
      return response;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const userRegisterThunk = createAsyncThunk(
  "user/signup",
  async ({ fullname, number, password, gender}, { rejectWithValue }) => {
    try {
      const response = await axiosIns.post("/user/register", {
        fullname,
        number,
        password,
        gender,
      });
      toast.success("Acount Create Successfull!!");
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const userLogoutThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosIns.post("/user/logout",);
      toast.success("Logout Successfull!!");
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const userGetProfileThunk = createAsyncThunk(
  "user/getprofile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosIns.get("/user/get-profile",);
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      console.log(errorOutput)
      return rejectWithValue(errorOutput);
    }
  }
);

export const GetOthereUserThunk = createAsyncThunk(
  "user/getotheruser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosIns.get("/user/get-other-user",);
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      console.log(errorOutput)
      return rejectWithValue(errorOutput);
    }
  }
);

