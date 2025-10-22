import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProtectedRoutes from "./components/utilities/ProtectedRoutes";
import UserProfile from "./pages/Home/componend/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes>
        <UserProfile />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
