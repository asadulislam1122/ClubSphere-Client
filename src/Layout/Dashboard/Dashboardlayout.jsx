import React from "react";
import { PiCashRegisterDuotone } from "react-icons/pi";
import {
  FaCcDinersClub,
  FaDollarSign,
  FaHome,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { MdEventAvailable } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import { IoIosCreate } from "react-icons/io";
import useRole from "../../Hooks/useRole";

const Dashboardlayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-semibold text-2xl text-primary">
            ClubSphere Dashboard
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                data-tip="ClubSphere"
              >
                {/* Home icon */}
                <img
                  className="w-8"
                  src="https://img.icons8.com/pulsar-gradient/48/disco-ball.png"
                  alt="Photography Club Logo"
                />

                <span className="is-drawer-close:hidden text-primary font-semibold font-medium">
                  ClubSphere
                </span>
              </NavLink>
            </li>
            {/* dashboard home
             */}

            <li>
              <Link
                to={"/dashboard"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                data-tip="Dashboard Home"
              >
                {/* Home icon */}
                <FaHome></FaHome>

                <span className="is-drawer-close:hidden"> Dashboard Home</span>
              </Link>
            </li>

            {/* my-registered-events */}
            <li>
              <NavLink
                to={"/dashboard/my-registered-events"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Registered Events"
              >
                {/* create icon */}
                <PiCashRegisterDuotone />
                <span className="is-drawer-close:hidden">
                  My Registered Events
                </span>
              </NavLink>
            </li>

            {role === "manager" && (
              <>
                {/* create club */}
                <li>
                  <NavLink
                    to={"/dashboard/club"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Create Club"
                  >
                    {/* create icon */}
                    <IoIosCreate></IoIosCreate>
                    <span className="is-drawer-close:hidden">Create Club</span>
                  </NavLink>
                </li>
                {/* my club */}
                <li>
                  <NavLink
                    to={"/dashboard/my-club"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    {/* Club icon */}
                    <FaCcDinersClub></FaCcDinersClub>
                    <span className="is-drawer-close:hidden">My Clubs</span>
                  </NavLink>
                </li>
                {/* add event */}
                <li>
                  <NavLink
                    to={"/dashboard/add-event"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Event"
                  >
                    {/* add icon */}
                    <MdEventAvailable />
                    <span className="is-drawer-close:hidden">Add Event</span>
                  </NavLink>
                </li>
                {/* manage events */}
                <li>
                  <NavLink
                    to={"/dashboard/manage-events"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Events"
                  >
                    {/* manage event icon */}
                    <FaTasks></FaTasks>
                    <span className="is-drawer-close:hidden">
                      Manage Events
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/all-payments"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Overview"
                  >
                    {/*  manager icon */}
                    <FaDollarSign></FaDollarSign>
                    <span className="is-drawer-close:hidden">
                      Admin Overview
                    </span>
                  </NavLink>
                </li>

                {/* Approve manager */}
                <li>
                  <NavLink
                    to={"/dashboard/approve-manager"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Manager"
                  >
                    {/*  manager icon */}
                    <GrUserManager />
                    <span className="is-drawer-close:hidden">
                      Approve Manager
                    </span>
                  </NavLink>
                </li>
                {/* Users managment */}
                <li>
                  <NavLink
                    to={"/dashboard/users-managment"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Managment"
                  >
                    {/*   Users Managment icon*/}
                    <FaUser></FaUser>
                    <span className="is-drawer-close:hidden">
                      Users Managment
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
