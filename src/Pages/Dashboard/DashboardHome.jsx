import React from "react";
import useRole from "../../Hooks/useRole";
import Loading from "../../Components/Loading/Loading";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "manager") {
    return <ManagerDashboard></ManagerDashboard>;
  } else {
    return <UserDashboard></UserDashboard>;
  }
};

export default DashboardHome;
