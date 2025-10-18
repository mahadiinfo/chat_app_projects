import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterThunk } from "../../store/user.slice/user.thunk";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatche = useDispatch();
  const [signupdata, setsignupdata] = useState({
    fullname: "",
    number: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  const { isAuthenticated } = useSelector((state) => state.userReducers);
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  const handlechange = (e) => {
    setsignupdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenderChange = (selectedOption) => {
    setsignupdata((prev) => ({
      ...prev,
      gender: selectedOption.value,
    }));
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "rgb(30 41 59)", // Tailwind color (slate-800)
      borderColor: "rgb(100 116 139)", // slate-500
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgb(15 23 42)", // slate-900
      color: "white",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "rgb(51 65 85)" // hover color (slate-700)
        : "transparent",
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "gray",
    }),
    singleValue: (base) => ({
      ...base,
      color: "gray",
    }),
  };
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handlesignup = async () => {
    if (signupdata.password !== signupdata.confirmpassword) {
      return toast.error("Password Or Confirm Pawssword not match");
    }
    const response = await dispatche(userRegisterThunk(signupdata));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  const [visible, setvisible] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-black ">
      <div className="flex flex-col bg-gray-800 p-5 gap-4 border border-gray-700 rounded-md items-center  md:w-full md:max-w-md ">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>

        <label
          htmlFor="fullname"
          className=" flex gap-2 border border-gray-500 shadow-sm shadow-violet-300 hover:bg-gray-900  hover:placeholder:text-white transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 p-2 w-full rounded-md"
        >
          <FaUser size={20} />
          <input
            type="text"
            name="fullname"
            id="fullname"
            onChange={handlechange}
            required
            placeholder="Full Name"
            className="focus:outline-none w-full"
          />
        </label>

        <label
          htmlFor="number"
          className=" flex gap-2 border border-gray-500 shadow-sm shadow-violet-300 hover:bg-gray-900  hover:placeholder:text-white transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 p-2 w-full rounded-md"
        >
          <IoCallOutline size={20} />
          <input
            type="text"
            name="number"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            id="number"
            onChange={handlechange}
            placeholder="Phone Number"
            className="focus:outline-none w-full"
          />
        </label>

        <label
          htmlFor="password"
          className="flex gap-2 border shadow-sm shadow-violet-300 hover:bg-gray-900  hover:placeholder:text-white transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1 border-gray-500 p-2 w-full rounded-md"
        >
          <RiLockPasswordLine size={25} />
          <input
            type={visible ? "text" : "password"}
            id="password"
            required
            name="password"
            onChange={handlechange}
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
        <label
          htmlFor="cpassword"
          className="flex gap-2 border shadow-sm shadow-violet-300 hover:bg-gray-900  hover:placeholder:text-white transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1  border-gray-500 p-2 w-full rounded-md"
        >
          <RiLockPasswordLine size={25} />
          <input
            type={visible ? "text" : "password"}
            id="cpassword"
            required
            name="confirmpassword"
            onChange={handlechange}
            className="focus:outline-none w-full"
            placeholder="Confirm password"
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
        <label htmlFor="gender" className="flex gap-2  p-2 w-full rounded-md">
          <Select
            className=" shadow-sm shadow-violet-300 hover:bg-gray-900  hover:placeholder:text-white transform transition-all delay-200 duration-400 ease-in-out   hover:shadow-lg hover:translate-y-1"
            required
            options={genderOptions}
            styles={customStyles}
            placeholder="Select Gender"
            onChange={handleGenderChange}
            id="gender"
          />
        </label>
        <button
          onClick={handlesignup}
          className="bg-violet-600 hover:bg-violet-700 transition-all delay-150 shadow-md hover:shadow-violet-400  duration-400 ease-in-out hover:translate-y-1 hover:scale-110 active:translate-y-2 rounded-sm h-10 w-[70%] text-center text-md font-bold cursor-pointer"
        >
          Signup
        </button>

        <p>
          Alrady have an account?{" "}
          <Link
            to="/login"
            className="text-violet-600 cursor-pointer underline"
          >
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Signup;
