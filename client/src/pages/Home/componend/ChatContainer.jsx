import React, { useEffect, useState, useRef } from "react";
import { IoArrowForward } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { CiImageOn } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import logo from "../../../assets/sitelogo23.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageThunk,
  sendMessageThunk,
} from "../../../store/message.slice/message.thunk";
import { useNavigate } from "react-router-dom";

const ChatContainer = ({ userSelected, setuserSelected }) => {
  const dispatch = useDispatch();
  const { selectedUser, userProfile } = useSelector((state) => state.userReducers);
  const { messages } = useSelector((state) => state.messageReducers);
  const { onlineUsers } = useSelector((state) => state.socketSlice);
  const [userMessage, setuserMessage] = useState("");
  const [userScroll, setuserScroll] = useState(false);
  const messageRef = useRef(null);
  const navigate = useNavigate();
  console.log(userScroll);

  useEffect(() => {
    if (messageRef.current && window.innerWidth <= 768) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ reciverId: selectedUser?._id }));
    }
  }, [selectedUser, dispatch]);

  const handleMessage = () => {
    if (userMessage.trim() === "") return;
    dispatch(
      sendMessageThunk({ reciverId: selectedUser?._id, message: userMessage })
    );
    setuserMessage("");
  };

  const handleback =()=>{
    localStorage.clear()
    setuserSelected(false)
    
    

  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleMessage();
    }
  };

  return selectedUser ? (
    <div className="h-full w-full overflow-hidden relative backdrop-blur-lg flex flex-col">
      {/* -------header section------ */}
      <div className="flex items-center gap-3 py-4 mx-4 border-b border-stone-500">
        <img src={logo} alt="profile" className="w-8 h-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser?.fullname}
          {onlineUsers?.includes(selectedUser._id) ? (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          )}
        </p>
        <IoMdHelpCircleOutline size={23} className="text-white" />
        <IoArrowForward
          size={24}
          onClick={handleback}
          className="text-white cursor-pointer xl:hidden"
        />
      </div>

      {/* message section */}
      <div className="flex flex-col xl:h-[calc(200%-135%)] h-[81%] scroll-auto w-full overflow-y-auto p-3">
        {messages?.map((mssg) => (
          <div
            key={mssg._id}
            className={`flex items-start gap-2.5 mb-4 ${
              mssg.senderId === userProfile._id
                ? "flex-row-reverse"
                : "justify-start"
            }`}
          >
            <img
              src={logo}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div
              className={`p-3 text-sm rounded-xl max-w-[220px] ${
                mssg.senderId === userProfile._id
                  ? "bg-violet-600 text-white rounded-br-none"
                  : "bg-violet-500/30 text-white rounded-bl-none"
              }`}
            >
              {mssg.message}
            </div>
          </div>
        ))}
        <div ref={messageRef} />
      </div>

      {/* input section */}
      <div className="flex items-center pt-2 justify-center">
        <CiImageOn size={30} className="text-violet-600 cursor-pointer" />
        <input
          type="text"
          onKeyPress={handleKeyPress}
          value={userMessage}
          placeholder="Message"
          onChange={(e) => setuserMessage(e.target.value)}
          className="ml-3 border border-violet-500/50 rounded-3xl text-white px-3 w-[70%] py-2 bg-violet-600/15 focus:outline-none"
        />
        <VscSend
          onClick={handleMessage}
          size={30}
          className="text-violet-600 cursor-pointer ml-2"
        />
      </div>
    </div>
  ) : (
    <div className="bg-violet-400/10 flex flex-col items-center h-screen justify-center gap-2 text-gray-500 max-md:hidden">
      <img src={logo} alt="logo" className="max-w-15" />
      <h1 className="text-2xl text-center font-semibold text-white">
        Time<span className="text-violet-500">Pass</span>
      </h1>
      <p className="text-lg font-medium text-white">Chat Anytime, Anywhere</p>
    </div>
  );
};

export default ChatContainer;
