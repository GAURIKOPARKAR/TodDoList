import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./Components/Login.jsx";

// const PrivateRoute = () => {
//   const token = localStorage.getItem("token");
//   return token ? <Outlet/>: <Navigate to="/login" replace />;
// };
const PrivateRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login but remember where they came from
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <App />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
