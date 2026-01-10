import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { Link } from "react-router";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 transition-colors duration-500">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-base-content/5">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              className="relative w-40 h-40 rounded-full border-4 border-base-100 object-cover shadow-2xl"
              alt="Profile"
            />
          </div>

          {/* User Info Section */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-black text-base-content tracking-tight">
                {user?.displayName}
              </h2>
              <p className="text-base-content/60 font-medium">{user?.email}</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="inline-block px-5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                {role} Account
              </span>
              <span className="inline-block px-5 py-1.5 rounded-full bg-success/10 text-success text-xs font-black uppercase tracking-widest border border-success/20">
                Active Status
              </span>
            </div>

            <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                to="/dashboard"
                className="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/20"
              >
                Go Dashboard
              </Link>
              <Link
                to="/"
                className="btn btn-outline border-base-content/20 hover:bg-base-content hover:text-base-100 rounded-2xl px-8"
              >
                Home
              </Link>
            </div>
          </div>
        </div>

        {/* Extra Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          <div className="bg-base-200/50 p-6 rounded-3xl border border-base-content/5 text-center hover:bg-base-200 transition-colors">
            <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-1">
              Member Since
            </p>
            <h4 className="text-xl font-bold text-base-content">2024</h4>
          </div>

          <div className="bg-base-200/50 p-6 rounded-3xl border border-base-content/5 text-center hover:bg-base-200 transition-colors">
            <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-1">
              Account Role
            </p>
            <h4 className="text-xl font-bold text-primary capitalize">
              {role}
            </h4>
          </div>

          <div className="bg-base-200/50 p-6 rounded-3xl border border-base-content/5 text-center hover:bg-base-200 transition-colors">
            <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-1">
              Verified User
            </p>
            <h4 className="text-xl font-bold text-success">Yes</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
