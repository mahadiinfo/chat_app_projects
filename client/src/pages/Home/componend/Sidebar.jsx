import React, { useEffect, useState } from "react";
import logo from "../../../assets/sitelogo23.png";
import { FiMenu } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetOthereUserThunk,
  userLogoutThunk,
} from "../../../store/user.slice/user.thunk";
import { setSelectedUser } from "../../../store/user.slice/user.slice";

const Sidebar = ({ userSelected, setuserSelected }) => {
  const { onlineUsers } = useSelector((state) => state.socketSlice);
  const { selectedUser, userProfile, OtherUserProfile } = useSelector((state) => state.userReducers);
  const dispatche = useDispatch();
  const navigate = useNavigate();
  const [iconeOpen, seticoneOpen] = useState(false)
  const [searcheUser, setsearcheUser] = useState("");
  const [user, setuser] = useState([]);
  useEffect(() => {
    if (!searcheUser) {
      setuser(OtherUserProfile);
    } else {
      setuser(
        OtherUserProfile?.filter((users) => {
          return users.fullname
            .toLowerCase()
            .includes(searcheUser.toLocaleLowerCase());
        })
      );
    }
  }, [searcheUser, OtherUserProfile]);

  useEffect(() => {
    (async () => {
      await dispatche(GetOthereUserThunk());
    })();
  }, []);

  const handlelogout = async () => {
    await dispatche(userLogoutThunk());
  };

  const handleOnclick = (e) => {
    setuserSelected(true)
    dispatche(setSelectedUser(e));
  };

  return  (
    <div
      className={`bg-[#8185b2]/10 h-screen p-5 rounded-r-xl flex flex-col  text-white ${
        selectedUser && userSelected ? "hidden xl:block" : "block"
      } `}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img 
              src={userProfile?.avatar || logo}
              alt="logo" 
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() => navigate("/profile")}
            />
            <span className="cursor-pointer">
              <h1 className="text-2xl text-center font-semibold ">
                Time<span className="text-violet-500">Pass </span>
              </h1>
            </span>
          </div>
          <div className="relative py-2 group">
            <FiMenu onClick={()=>seticoneOpen(true)} size={24} className={`text-white cursor-pointer ${iconeOpen ? "hidden" : "block"}`} />
            <FiMenu onClick={()=>seticoneOpen(false)} size={24} className={`text-white cursor-pointer ${iconeOpen ? "block" : "hidden"}`} />
            <div className={`absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border group-hover:block border-gray-600 text-gray-100 ${iconeOpen ? "block" : "hidden"}`}>
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm "
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-600" />
              <p
                onClick={handlelogout}
                className="cursor-pointer text-sm flex items-center  gap-1"
              >
                Logout <IoIosLogOut className="space-x-1" size={18} />
              </p>
            </div>
          </div>
        </div>

        {/* search section */}

        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <CiSearch size={20} />
          <input
            type="text"
            onChange={(e) => setsearcheUser(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-md placeholder:[#c8c8c8] flex-1"
            placeholder="Search user...."
          />
        </div>
      </div>

      {/* user id show */}

      <div className="flex flex-col gap-1  sm:h-[65%] h-[85%] overflow-y-scroll  ">
        {user?.map((user, index) => (
          <div
            onClick={() => handleOnclick(user)}
            key={index}
            className={`relative flex hover:bg-[#282143]/70 items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              user?._id === selectedUser?._id && userSelected && "bg-[#282143]/70"
            } `}
          >
            <img
              src={user?.avatar || logo}
              alt="logo"
              className="w-[35px] aspect-[1/1] rounded-full object-cover"
            />

            <div className="flex flex-col leading-5">
              <p>{user?.fullname}</p>
              {onlineUsers?.includes(user?._id) ? (
                <span className="text-green-400 text-xs ">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs ">Ofline</span>
              )}
            </div>
            {index > 2 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* userprofile logout */}
    </div>
  );
};

export default Sidebar;
