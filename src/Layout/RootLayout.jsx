import React from "react";
import { Outlet } from "react-router";

import Navbar from "../Pages/Home/Shareds/Navbar/Navbar";
import Footer from "../Pages/Home/Shareds/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
