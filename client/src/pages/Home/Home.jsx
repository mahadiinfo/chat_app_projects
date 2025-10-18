import React, { useState } from "react";
import Sidebar from "./componend/Sidebar";
import ChatContainer from "./componend/ChatContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  initializeSocket,
  setSocketOnlineUser,
} from "../../store/socket/socket.slice";
import { setNewMessage } from "../../store/message.slice/message.slice";

const HomePage = () => {
  const [userSelected, setuserSelected] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducers
  );
  const { socket } = useSelector((state) => state.socketSlice);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setSocketOnlineUser(onlineUsers));
    });
    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage));
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  return (
    <div className="bg-black">
      <div className="border w-full h-screen sm:px-[15%] sm:py-[4%]">
        <div
          className={`sm:backdrop-blur-xl sm:border-2 sm:border-gray-600 sm:rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${
            userSelected
              ? "xl:grid-cols-[1fr_2fr]"
              : "xl:grid-cols-2"
          } `}
        >
          <Sidebar
            userSelected={userSelected}
            setuserSelected={setuserSelected}
          />
          <ChatContainer
            userSelected={userSelected}
            setuserSelected={setuserSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
