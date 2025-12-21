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
import PaymentSuccessful from "../Layout/Dashboard/Payment/PaymentSuccessful";
import PaymentCencel from "../Layout/Dashboard/Payment/PaymentCencel";
import Manager from "../Pages/Manager/Manager";
import ApproveManager from "../Pages/Dashboard/ApproveManager";
import UsersManagment from "../Pages/Dashboard/UsersManagment";
import AdminRoute from "./AdminRoute";
import AddEvent from "../Pages/Dashboard/AddEvent";
import AllEvent from "../Pages/Event/AllEvent";
import EventDetails from "../Pages/Event/EventDetails";
import MyRegisteredEvents from "../Pages/Dashboard/MyRegisteredEvents";
import ManageEvents from "../Pages/Dashboard/ManageEvents";
import AllPayments from "../Pages/Dashboard/AllPayments";
import ManagerRoute from "./ManagerRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome";

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
        path: "events/:id",

        element: (
          <PrivateRoute>
            <EventDetails></EventDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "all-events",
        Component: AllEvent,
      },
      {
        path: "all-club",
        element: <AllClub />,
        loader: async () => {
          const res = await fetch("https://clubshapare-server.vercel.app/club");
          return res.json();
        },
      },
      {
        path: "club/:id",
        element: (
          <PrivateRoute>
            <ClubDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://clubshapare-server.vercel.app/club/${params.id}`
          );
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
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-club",
        element: (
          <ManagerRoute>
            <MyClub></MyClub>
          </ManagerRoute>
        ),
      },
      {
        path: "club",
        element: (
          <ManagerRoute>
            {" "}
            <Club></Club>
          </ManagerRoute>
        ),
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
      {
        path: "add-event",
        element: (
          <ManagerRoute>
            <AddEvent></AddEvent>
          </ManagerRoute>
        ),
      },
      {
        path: "my-registered-events",
        element: <MyRegisteredEvents />,
      },
      {
        path: "manage-events",

        element: (
          <ManagerRoute>
            <ManageEvents></ManageEvents>
          </ManagerRoute>
        ),
      },

      {
        path: "all-payments",
        element: (
          <AdminRoute>
            <AllPayments />
          </AdminRoute>
        ),
      },
    ],
  },
]);
