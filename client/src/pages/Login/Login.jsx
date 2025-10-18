import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { LuEyeClosed } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLoginThunk } from "../../store/user.slice/user.thunk";


const Login = () => {
  const navigate = useNavigate();
  const dispatche = useDispatch();
  const [logindata, setlogindata] = useState({
    number: "",
    password: "",
  });
  const { isAuthenticated } = useSelector((state) => state.userReducers);
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handlechange = (e) => {
    setlogindata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await dispatche(userLoginThunk(logindata));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  const [visible, setvisible] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white ">
      <div className="flex flex-col bg-gray-800 p-5 gap-4 border border-gray-700 rounded-md items-center  md:w-full md:max-w-md ">
        <h1 className="text-2xl font-bold">Please Login</h1>
        <label
          htmlFor="number"
          className=" flex gap-2 border border-gray-500 shadow-sm shadow-violet-300 hover:bg-gray-900  hover:placeholder:text-white transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 p-2 w-full rounded-md"
        >
          <IoCallOutline size={25} />
          <input
            name="number"
            onChange={handlechange}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            id="number"
            placeholder="Mobaile Number"
            className="focus:outline-none w-full"
          />
        </label>

        <label
          htmlFor="password"
          className="flex gap-2 border border-gray-500 shadow-sm shadow-violet-300 hover:bg-gray-900  hover:placeholder:text-white transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 p-2 w-full rounded-md"
        >
          <RiLockPasswordLine size={25} />
          <input
            type={visible ? "text" : "password"}
            name="password"
            onChange={handlechange}
            id="password"
            className="focus:outline-none w-full"
            placeholder="Password"
          />
          <LuEyeClosed
            onClick={() => setvisible(true)}
            size={24}
            className={`${visible ? "hidden" : ""}`}
          />
          <FaRegEye
            onClick={() => setvisible(false)}
            size={24}
            className={`${visible ? "" : "hidden"}`}
          />
        </label>
        <button
          onClick={handleLogin}
          className="bg-violet-600 hover:bg-violet-700 transition delay-150  duration-400 ease-in-out hover:translate-y-1 hover:scale-110 rounded-sm h-8 w-[50%] text-center text-md font-bold cursor-pointer"
        >
          Login
        </button>

        <p>
          Don't have an account?
          <Link
            to="/signup"
            className="text-violet-500 underline cursor-pointer"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
