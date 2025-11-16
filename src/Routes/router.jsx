import { createBrowserRouter } from "react-router";
import RootLAyout from "../Layouts/RootLAyout";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLAyout  ,
    children:[
        {
            index: true,
            Component: Home
        }
    ]
  },
]);
