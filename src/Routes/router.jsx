import { createBrowserRouter } from "react-router";
import RootLAyout from "../Layouts/RootLAyout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Covarage/Coverage";

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
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/ServiceCenters.json").then((res) => res.json()),
      },
    ],
  },
]);
