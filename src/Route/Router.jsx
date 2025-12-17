import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Club from "../Components/Club/Club";
import PrivateRoute from "./PrivateRoute";
import Dashboardlayout from "../Layout/Dashboard/Dashboardlayout";
import MyClub from "../Pages/Dashboard/MyClub";
import AllClub from "../Components/Club/AllClub";
import ClubDetails from "../Components/Club/ClubDetails";
import Payment from "../Layout/Dashboard/Payment/Payment";
import PaymentSuccessful from "../Layout/Dashboard/Payment/PaymentSuccessful";
import PaymentCencel from "../Layout/Dashboard/Payment/PaymentCencel";
import PaymentHistry from "../Layout/Dashboard/Payment/PaymentHistry";
import Manager from "../Pages/Manager/Manager";
import ApproveManager from "../Pages/Dashboard/ApproveManager";
import UsersManagment from "../Pages/Dashboard/UsersManagment";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/manager",
        element: (
          <PrivateRoute>
            <Manager></Manager>
          </PrivateRoute>
        ),
      },
      {
        path: "all-club",
        element: <AllClub />, // Component → element
        loader: async () => {
          const res = await fetch("http://localhost:3000/club");
          return res.json();
        },
      },
      {
        path: "club/:id",
        element: <ClubDetails />,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/club/${params.id}`);
          return res.json();
        },
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboardlayout></Dashboardlayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-club",
        Component: MyClub,
      },
      {
        path: "club",
        element: (
          <PrivateRoute>
            <Club></Club>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:clubId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccessful,
      },
      {
        path: "payment-canceled",
        Component: PaymentCencel,
      },
      {
        path: "payment-history",
        Component: PaymentHistry,
      },
      {
        path: "approve-manager",
        element: (
          <AdminRoute>
            <ApproveManager></ApproveManager>
          </AdminRoute>
        ),
      },
      {
        path: "users-managment",
        element: (
          <AdminRoute>
            <UsersManagment></UsersManagment>
          </AdminRoute>
        ),
      },
    ],
  },
]);
