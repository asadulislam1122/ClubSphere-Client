// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const AdminHome = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: stats = {}, isLoading } = useQuery({
//     queryKey: ["admin-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/admin-stats");
//       return res.data;
//     },
//   });

//   if (isLoading) return <span className="loading loading-spinner"></span>;

//   return (
//     <div className="p-10">
//       <h2 className="text-3xl mb-5">Welcome, Admin!</h2>
//       <div className="stats shadow w-full">
//         {/* Total Revenue Card */}
//         <div className="stat">
//           <div className="stat-title">Total Revenue</div>
//           <div className="stat-value text-primary">${stats.totalRevenue}</div>
//           <div className="stat-desc">Combined from Events & Clubs</div>
//         </div>

//         <div className="stat">
//           <div className="stat-title">Total Users</div>
//           <div className="stat-value text-secondary">{stats.totalUsers}</div>
//         </div>

//         <div className="stat">
//           <div className="stat-title">Total Events</div>
//           <div className="stat-value">{stats.totalEvents}</div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AdminHome;
