import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosIns } from "../../components/utilities/axios.instanche";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ reciverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosIns.post(`/message/send/${reciverId}`, {
        message,
      });
      toast.success("send message");
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

//  get message
export const getMessageThunk = createAsyncThunk(
  "message/get",
  async ({ reciverId }, { rejectWithValue }) => {
    try {
      const response = await axiosIns.get(`/message/get-message/${reciverId}`);
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);
