import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { userGetProfileThunk } from "./store/user.slice/user.thunk";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(userGetProfileThunk());
    })();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
