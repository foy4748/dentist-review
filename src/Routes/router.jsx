import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/Shared/MainLayout";

// Route handlers
import ErrorPage from "../components/Shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";

// Auth Pages
import Login from "../components/AuthPages/Login";
import Register from "../components/AuthPages/Register";

// Testing Purpose
//import Test from "../components/Shared/Test";

// Service Pages
import Services from "../components/Services/Services";
import ServiceDetails from "../components/Services/ServiceDetails";

// Private Routes ------
// My Reviews
import MyReviews from "../components/MyReviews/MyReviews";

// Add Service
import AddService from "../components/AddService/AddService";

const routerObj = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },

      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routerObj);

export default router;
