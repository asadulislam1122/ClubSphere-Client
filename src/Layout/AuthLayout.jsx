import React from "react";
import Logo from "../Components/Logo";
import { Link, Outlet } from "react-router";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="w-11/12 max-w-6xl mx-auto py-6">
      <Link to={"/"}>
        <Logo />
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-10 mt-10">
        {/* Form Section */}
        <div className="flex-1 w-full">
          <div className=" p-8 shadow-xl rounded-2xl">
            <Outlet />
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 hidden md:block">
          <img src={authImg} alt="" className="w-full rounded-2xl shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
