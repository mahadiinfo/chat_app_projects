import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./user.slice/user.slice";
import messageReducers from "./message.slice/message.slice";
import socketSlice from "./socket/socket.slice";

export const store = configureStore({
  reducer: {
    userReducers,
    messageReducers,
    socketSlice,
  },
  middleware: (m) =>
    m({
      serializableCheck: {
        ignoredPaths: ["socketSlice.socket"],
      },
    }),
});
