import React from "react";
import { Outlet } from "react-router";
import Footer from "../Pages/Home/Sheared/Footer/Footer";
import NavBar from "../Pages/Home/Sheared/Navbar/NavBar";

const RootLAyout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <header>
        <NavBar></NavBar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLAyout;
