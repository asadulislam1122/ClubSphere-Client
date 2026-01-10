// 2 line
import { FaMoon, FaSun } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import Logo from "../../../../Components/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useRole from "../../../../Hooks/useRole";

const Navbar = () => {
  // 2 line
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const { user, signOute } = useAuth();
  const { role } = useRole();
  const [openProfile, setOpenProfile] = useState(false);

  const handleSignOut = () => {
    signOute()
      .then(() => toast.success("Logout Successful"))
      .catch(console.error);
  };

  // 3 step
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const navClass = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "hover:text-primary transition";

  return (
    <div className="w-full sticky top-0 z-50 bg-base-100 shadow">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              ☰
            </label>
            <ul className="menu font-semibold dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink className={navClass} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={navClass} to="/all-club">
                  All Club
                </NavLink>
              </li>
              <li>
                <NavLink className={navClass} to="/all-events">
                  All Events
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink className={navClass} to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              )}

              {user && (
                <li>
                  <NavLink to="/manager">Be a Manager</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
            </ul>
          </div>

          <Logo />
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-semibold menu-horizontal gap-6">
            <li>
              <NavLink className={navClass} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={navClass} to="/all-club">
                All Club
              </NavLink>
            </li>
            <li>
              <NavLink className={navClass} to="/all-events">
                All Events
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink className={navClass} to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            )}

            {user && (
              <li>
                <NavLink to="/manager">Be a Manager</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-2"
              >
                <img
                  className="w-10 cursor-pointer h-10 rounded-full border"
                  src={user.photoURL}
                />
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-3 w-48 bg-base-100 border border-base-content/10 shadow-2xl rounded-2xl overflow-hidden z-50 transition-all duration-300">
                  {/* Dashboard Link */}
                  <Link
                    to="/dashboard"
                    className="block px-5 py-3 text-sm font-medium text-base-content hover:bg-primary hover:text-primary-content transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  {role === "manager" && (
                    <li>
                      <NavLink
                        className="block px-5 py-3 text-sm font-medium text-base-content hover:bg-primary hover:text-primary-content transition-colors duration-200"
                        to="/dashboard/my-club"
                      >
                        My Club
                      </NavLink>
                    </li>
                  )}

                  {/* Profile Link */}
                  <Link
                    to="/dashboard/profile"
                    className="block px-5 py-3 text-sm font-medium text-base-content hover:bg-primary hover:text-primary-content transition-colors duration-200"
                  >
                    My Profile
                  </Link>
                  {/* step 4 */}

                  <button
                    onClick={() => setDark(!dark)}
                    className="text-xl cursor-pointer hover:bg-primary hover:text-primary-content transition-colors duration-200 p-2 mr-3 rounded-full ml-4"
                    title="Toggle Theme"
                  >
                    {dark ? <FaSun className="text-yellow-400" /> : <FaMoon />}
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-5 py-3 text-sm font-bold text-error hover:bg-error/10 border-t border-base-content/5 transition-colors cursor-pointer duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// import React from "react";
// import Logo from "../../../../Components/Logo";
// import { Link, NavLink } from "react-router";
// import useAuth from "../../../../Hooks/useAuth";
// import { toast } from "react-toastify";
// import useRole from "../../../../Hooks/useRole";
// import "./navbar.css";
// const Navbar = () => {
//   const { user, signOute } = useAuth();
//   const { role } = useRole();

//   const handleSignOut = () => {
//     signOute()
//       .then((result) => {
//         console.log(result);
//         toast.success("log Out Successfully", {
//           position: "top-center",
//           duration: 1000,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const links = (
//     <>
//       <li>
//         <NavLink to={"/"}>Home</NavLink>
//       </li>
//       <li>
//         <NavLink to={"/all-club"}>All Club</NavLink>
//       </li>

//       <li>
//         <NavLink to={"/all-events"}>All Events</NavLink>
//       </li>
//       <li>
//         <NavLink to={"/dashboard"}>Dashboard</NavLink>
//       </li>

//       {role === "manager" && (
//         <>
//           <li>
//             <NavLink to={"/dashboard/my-club"}>My Club</NavLink>
//           </li>
//         </>
//       )}
//       {user && <></>}
//       <li>
//         <NavLink to={"/manager"}>Be a Manager</NavLink>
//       </li>
//     </>
//   );
//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {" "}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />{" "}
//             </svg>
//           </div>
//           <ul
//             tabIndex="-1"
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//           >
//             {links}
//           </ul>
//         </div>
//         <Link to={"/"}>
//           <Logo></Logo>
//         </Link>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{links}</ul>
//       </div>
//       <div className="navbar-end">
//         {user?.photoURL && (
//           <img
//             className="w-10 h-10 rounded-full mr-2 object-cover"
//             src={user.photoURL}
//             referrerPolicy="no-referrer"
//             alt={user?.displayName || "User Photo"}
//           />
//         )}
//         {user ? (
//           <a onClick={handleSignOut} className="btn bg-primary text-white">
//             Log Out
//           </a>
//         ) : (
//           <Link to={"/login"} className="btn bg-primary text-white">
//             Login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
