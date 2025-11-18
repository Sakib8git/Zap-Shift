import { createBrowserRouter } from "react-router";
import RootLAyout from "../Layouts/RootLAyout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Covarage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Rider from "../Pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashbordLayout from "../Layouts/DashbordLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLAyout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/ServiceCenters.json").then((res) => res.json()),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/ServiceCenters.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashbordLayout></DashbordLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
    ],
  },
]);
