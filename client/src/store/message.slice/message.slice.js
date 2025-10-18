import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
  buttonLoading: false,
  messages: [],
};
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      const newMessage = action.payload;
      const messages = state.messages || [];
      if (!messages.some(msg => msg._id === newMessage._id)) {
        state.messages = [...messages, newMessage];
      }
    },
  },
  extraReducers: (builder) => {
    // send message
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.messages = [...state.messages, action.payload?.responseData];
      state.buttonLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // get message
    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.messages = action.payload?.responseData?.message;
      state.buttonLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },
});

export const { setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
