import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: [],
  isConnected: false
};
export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      if (!state.socket) {
        const socket = io(import.meta.env.VITE_DB_ORIGIN, {
          query: {
            userId: action.payload,
          },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });
        state.socket = socket;
      }
    },

    setSocketOnlineUser: (state, action) => {
      state.onlineUsers = action.payload || [];
    },

    setSocketConnected: (state, action) => {
      state.isConnected = action.payload;
    },

    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
        state.isConnected = false;
        state.onlineUsers = [];
      }
    }
  },
});

export const { initializeSocket, setSocketOnlineUser } = socketSlice.actions;

export default socketSlice.reducer;
