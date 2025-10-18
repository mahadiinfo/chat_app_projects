import React, { useState, useRef } from "react";
import logo from "../../../assets/sitelogo23.png";
import { LuEyeClosed } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  userPassChangeThunk,
  userProfilechangeThunk,
  userAvatarChangeThunk,
} from "../../../store/user.slice/user.thunk";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [saveChange, setsaveChange] = useState(false);
  const [userPasschangeForm, setuserPasschangeForm] = useState(true);
  const { userProfile } = useSelector((state) => state.userReducers);

  const [changePassword, setchangePassword] = useState({
    number: "",
    oldPassword: "",
    newPassword: "",
    confirmpass: "",
  });
  const [editProfile, setEditProfile] = useState({
    number: "",
    fullname: "",
    newnumber: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        // Optionally, you can show a preview of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = async () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const response = await dispatch(userAvatarChangeThunk(formData));
      if (response?.payload?.data?.success) {
        toast.success("Avatar updated successfully!");
        navigate("/");
      }
    }
  };

  const handleChangepass = async () => {
    if (changePassword.newPassword !== changePassword.confirmpass) {
      return toast.error("Password Or Confirm Pawssword not match");
    }
    const response = await dispatch(userPassChangeThunk(changePassword));
    if (response?.payload?.data?.success) {
      navigate("/");
    }
  };

  const handleSaveChange = async () => {
    if (saveChange) {
      const response = await dispatch(userProfilechangeThunk(editProfile));
      if (response?.payload?.data?.success) {
        navigate("/");
      }
    } else {
      setuserPasschangeForm(false);
    }
  };

  const handlepassChange = (e) => {
    setchangePassword({
      ...changePassword,
      number: userProfile?.number,
      [e.target.name]: e.target.value,
    });
  };
  const handleProfileEdit = (e) => {
    setsaveChange(true);
    setEditProfile({ ...editProfile, number: userProfile?.number, [e.target.name]: e.target.value });
  };

  return userPasschangeForm ? (
    <div className="bg-black">
      <div className="border w-full h-screen  sm:px-[15%] sm:py-[4%]">
        <div className=" sm:backdrop-blur-xl flex items-center justify-center sm:border-2 sm:border-gray-600 sm:rounded-2xl overflow-hidden h-[100%] w-full relative ">
          <div className="transition max-sm:border relative  max-sm:border-gray-500 shadow shadow-violet-400  max-sm:rounded-2xl max-sm:w-[80%] w-full h-full max-sm:h-[70%] ease-in translate-y-3 duration-500">
            <div className="relative mt-10 flex justify-center  w-full  ">
              <img
                src={avatarFile ? URL.createObjectURL(avatarFile) : userProfile?.avatar || logo}
                alt=""
                className="w-30 border border-violet-600 rounded-full h-30"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>
            <div className="flex justify-center">
              <h1
                onClick={() => fileInputRef.current.click()}
                className="text-center text-white shadow-sm shadow-violet-300  hover:shadow-lg    font-medium bg-violet-800/30  cursor-pointer transition hover:translate-y-2 hover:scale-110 duration-300 ease-in-out   mt-5 border rounded-full border-violet-500 p-2 px-4"
              >
                Upload Image ⇩
              </h1>
            </div>
            {avatarFile && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleUploadAvatar}
                  className="text-center text-white shadow-sm shadow-green-300  hover:shadow-lg font-medium bg-green-800/30  cursor-pointer transition hover:translate-y-2 hover:scale-110 duration-300 ease-in-out mt-5 border rounded-full border-green-500 p-2 px-4"
                >
                  Save Avatar
                </button>
              </div>
            )}
            <div className="text-white flex justify-center mt-10  w-full">
              <div className="md:w-[50%]  w-[70%] ">
                <h1 className="text-md font-medium">Your Name</h1>
                <input
                  name="fullname"
                  placeholder={userProfile?.fullname}
                  onChange={handleProfileEdit}
                  type="text"
                  className="border-1 border-violet-500 shadow-sm shadow-violet-300 hover:bg-gray-900   transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 focus:outline-none px-3 p-2 bg-violet-900/30 rounded-full w-full  "
                />
                <h1 className="text-md mt-6 font-medium">Your Number</h1>
                <input
                  name="newnumber"
                  onChange={handleProfileEdit}
                  placeholder={userProfile?.number}
                  type="text"
                  className="border-1 border-violet-500 shadow-sm shadow-violet-300 hover:bg-gray-900  transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 focus:outline-none px-3 p-2 bg-violet-900/30 rounded-full w-full  "
                />
                <div className="flex justify-center">
                  <h1
                    onClick={handleSaveChange}
                    className="text-center text-white shadow-sm shadow-violet-300  hover:shadow-lg    font-medium bg-violet-800/30  cursor-pointer transition hover:translate-y-2 hover:scale-110 duration-300 ease-in-out   mt-5 border rounded-full border-violet-500 p-2 px-4"
                  >
                    {saveChange ? "save Change" : " Did you Change Password ?"}
                  </h1>
                </div>
              </div>
            </div>
            <footer className="mt-10">
              <h1 className="text-2xl text-center text-white font-semibold ">
                Time<span className="text-violet-500">Pass</span>
              </h1>
            </footer>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-black">
      <div className="border w-full h-screen sm:px-[15%] sm:py-[4%]">
        <div className="sm:backdrop-blur-xl  flex items-center  sm:border-2 sm:border-gray-600 sm:rounded-2xl overflow-hidden h-[100%]  relative ">
          <div className="text-white flex transition  transform-3d ease-initial translate-y-2 duration-500 items-center  justify-center w-full">
            <div className="md:w-[60%] p-5 max-sm:border   max-sm:border-gray-500 max-sm:rounded-2xl  w-[80%] ">
              <h1 className="text-center w-full lg:w-[50%] mx-auto text-xl font-medium ">
                Change Your old password
                <div className="w-full mx-auto mt-3 bg-violet-500 h-[2px] "></div>
              </h1>
              <h1 className="text-md mt-10 font-medium"></h1>
              <input
                onChange={(e) => handlepassChange(e)}
                name="oldPassword"
                placeholder="Enter Old Password"
                type="text"
                className="border-1 border-violet-500 shadow-sm shadow-violet-300 hover:bg-gray-900  placeholder:text-violet-400 transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 focus:outline-none px-3 p-2 bg-violet-900/30 rounded-full w-full  "
              />
              <h1 className="text-md mt-6 font-medium"></h1>

              <div className="border-1 flex border-violet-500 shadow-sm shadow-violet-300 hover:bg-gray-900  placeholder:text-violet-400 transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 focus:outline-none px-3 p-2 bg-violet-900/30 rounded-full w-full ">
                <input
                  name="newPassword"
                  placeholder="New Password"
                  onChange={(e) => handlepassChange(e)}
                  type={`${visible ? "text" : "password"}`}
                  className=" placeholder:text-violet-400 focus:outline-none w-full"
                />
                <LuEyeClosed
                  onClick={() => setVisible(true)}
                  size={24}
                  className={`cursor-pointer text-violet-400 ${
                    visible ? "hidden" : ""
                  }`}
                />
                <FaRegEye
                  onClick={() => setVisible(false)}
                  size={24}
                  className={`cursor-pointer text-violet-400 ${
                    visible ? "" : "hidden"
                  }`}
                />
              </div>
              <h1 className="text-md mt-6 font-medium"></h1>
              <div className="border-1 flex border-violet-500 shadow-sm shadow-violet-300 hover:bg-gray-900  placeholder:text-violet-400 transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 focus:outline-none px-3 p-2 bg-violet-900/30 rounded-full w-full ">
                <input
                  name="confirmpass"
                  onChange={(e) => handlepassChange(e)}
                  placeholder="Confirm Password"
                  type={`${visible ? "text" : "password"}`}
                  className=" placeholder:text-violet-400 focus:outline-none w-full"
                />
                <LuEyeClosed
                  onClick={() => setVisible(true)}
                  size={24}
                  className={`cursor-pointer text-violet-400 ${
                    visible ? "hidden" : ""
                  }`}
                />
                <FaRegEye
                  onClick={() => setVisible(false)}
                  size={24}
                  className={`cursor-pointer text-violet-400 ${
                    visible ? "" : "hidden"
                  }`}
                />
              </div>
              <div className="flex justify-center">
                <h1
                  onClick={handleChangepass}
                  className="text-center text-white shadow-sm shadow-violet-300  hover:shadow-lg    font-medium bg-violet-800/30  cursor-pointer transition hover:translate-y-2 hover:scale-110 duration-300 ease-in-out   mt-5 border rounded-full border-violet-500 p-2 px-4"
                >
                  Confirm
                </h1>
              </div>
              <h1 className="text-2xl text-white mt-10 text-center font-semibold ">
                Time<span className="text-violet-500">Pass</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
