import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserShield, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // Make Admin with Confirmation
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user.displayName} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} is now an Admin!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  // Remove Admin with Confirmation
  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove Admin access from ${user.displayName}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "user" };
        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} removed from Admin`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <title>Dashboard-User-Managment</title>
      <h2 className="font-semibold text-2xl text-primary text-center p-4">
        Users Management: {users.length}
      </h2>
      <p className="text-center p-2">Search Text: {searchText}</p>
      {/* search */}
      <div className="text-center py-4">
        <label className="input ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            required
            placeholder="Search"
          />
        </label>
        <button className="btn btn-primary ml-2">Search</button>
      </div>
      {/*  */}
      <div className="overflow-x-auto rounded-xl">
        <table className="table ">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-700">
              <th>No</th>
              <th>Photo & Name</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Date</th>
              <th>Admin Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/0nbjBYy/user.png"
                          }
                          referrerPolicy="no-referrer"
                          alt={user?.displayName || "User"}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-ghost bg-red-500 text-white hover:bg-red-700"
                      title="Remove Admin"
                    >
                      <FaUserSlash />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost bg-green-500 text-white hover:bg-green-700"
                      title="Make Admin"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      document.getElementById("user_details_modal").showModal();
                    }}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal Structure */}
      <dialog
        id="user_details_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          {selectedUser && (
            <div>
              <h3 className="font-bold text-lg text-center border-bottom pb-2">
                User Information
              </h3>
              <div className="flex flex-col items-center gap-4 mt-4">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        selectedUser.photoURL ||
                        "https://i.ibb.co/0nbjBYy/user.png"
                      }
                      alt="User"
                    />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <p>
                    <strong>Name:</strong> {selectedUser.displayName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Role:</strong>{" "}
                    <span className="badge badge-secondary capitalize">
                      {selectedUser.role || "user"}
                    </span>
                  </p>
                  <p>
                    <strong>User ID:</strong>{" "}
                    <span className="text-xs">{selectedUser._id}</span>
                  </p>
                  <p>
                    <strong>Joined At:</strong>{" "}
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn btn-primary w-full">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UsersManagement;
