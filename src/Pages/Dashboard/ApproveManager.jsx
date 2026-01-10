import { useQuery } from "@tanstack/react-query";
import { IoPersonRemoveSharp } from "react-icons/io5";
import React from "react";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const ApproveManager = () => {
  const axiosSecure = useAxiosSecure();
  const { data: managers = [], refetch } = useQuery({
    queryKey: ["managers", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("managers");
      return res.data;
    },
  });
  console.log(managers);
  //
  const updateManagerStatus = (manager, status) => {
    const updateInfo = {
      status: status,
      email: manager.email,
    };
    axiosSecure.patch(`/managers/${manager._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Manager has been  ${status}
          `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleAprovel = (manager) => {
    updateManagerStatus(manager, "approved");
  };

  const handleReject = (manager) => {
    updateManagerStatus(manager, "rejected");
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/managers/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Deleted!",
              "Manager application has been deleted.",
              "success"
            );

            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <title>Dashboard-Approve-Manager</title>
      <h2 className="text-center p-4 text-primary font-semibold text-3xl ">
        Manager pending Approvel: ({managers.length})
      </h2>
      {/* table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-700">
              <th>No</th>
              <th>Photo & Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager, i) => (
              <tr key={manager._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            manager?.photo || "https://via.placeholder.com/150"
                          }
                          referrerPolicy="no-referrer"
                          alt="Manager Photo"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{manager.name}</div>
                    </div>
                  </div>
                </td>
                <td>{manager.email}</td>
                <td>{manager.phone}</td>
                <td className="mt-4">
                  {
                    <p
                      className={`font-bold capitalize ${
                        manager.status === "approved"
                          ? "text-green-600"
                          : manager.status === "pending"
                          ? "text-fuchsia-500"
                          : "text-red-600"
                      }`}
                    >
                      {manager.status}
                    </p>
                  }
                </td>

                <td>
                  <button
                    onClick={() => handleAprovel(manager)}
                    className="btn hover:bg-primary "
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button
                    onClick={() => handleReject(manager)}
                    className="btn hover:bg-red-400 ml-1 mr-1 "
                  >
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button
                    onClick={() => handleDelete(manager._id)}
                    className="btn hover:bg-red-500 "
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveManager;
