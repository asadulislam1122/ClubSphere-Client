// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import { Link, useNavigate } from "react-router";
// import SosialLogin from "./SosialLogin";
// import { toast } from "react-toastify";
// import axios from "axios";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const Register = () => {
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { registerUser, updateUserProfile } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleRegistation = (data) => {
//     // console.log("after register", data.photo[0]);
//     const profileImg = data.photo[0];
//     registerUser(data.email, data.password)
//       .then(() => {
//         // console.log(result.user);
//         // store data img
//         const formData = new FormData();
//         formData.append("image", profileImg);
//         const image_Api_URL = `https://api.imgbb.com/1/upload?key=${
//           import.meta.env.VITE_image_host
//         }`;
//         axios.post(image_Api_URL, formData).then((res) => {
//           // console.log("after img uploade", res.data.data.url);
//           const photoURL = res.data.data.url;
//           // create user in the database
//           const userInfo = {
//             email: data.email,
//             displayName: data.name,
//             photoURL: photoURL,
//           };
//           axiosSecure.post("/users", userInfo).then((res) => {
//             if (res.data.insertedId) {
//               console.log("user created database");
//             }
//           });
//           // update profile
//           const userProfile = {
//             displayName: data.name,
//             photoURL: photoURL,
//           };
//           updateUserProfile(userProfile)
//             .then(() => {
//               console.log("user profile update done");
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         });

//         toast.success("Account created successfully!", {
//           duration: 1000,
//         });
//         navigate("/");
//       })
//       .catch((err) => {
//         console.log(err.message);
//         toast.error(err.message);
//       });
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center
//       px-4"
//     >
//       <title>ClubSphere-Register-Page</title>
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center">
//           <h2 className="text-2xl font-bold text-white">Create Account</h2>
//           <p className="text-sm text-purple-100 mt-1">
//             Join us and start your journey
//           </p>
//         </div>

//         {/* Form */}
//         <div className="p-6">
//           <form
//             onSubmit={handleSubmit(handleRegistation)}
//             className="space-y-4"
//           >
//             {/* name */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 {...register("name", { required: true })}
//                 className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 rounded-lg"
//                 placeholder="Your Name"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">Name is required</p>
//               )}
//             </div>
//             {/* photo */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Your Photo
//               </label>

//               <input
//                 type="file"
//                 {...register("photo", { required: true })}
//                 className="file-input input input-bordered w-full mt-1 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 rounded-lg"
//                 placeholder="Your Photo"
//               />
//               {errors.photo && (
//                 <p className="text-red-500 text-xs mt-1">Photo is required</p>
//               )}
//             </div>
//             {/* Email */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 {...register("email", { required: true })}
//                 className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 rounded-lg"
//                 placeholder="you@example.com"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">Email is required</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password", {
//                     required: true,
//                     minLength: 6,
//                     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
//                   })}
//                   className="input input-bordered w-full mt-1 pr-16 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 rounded-lg"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-600 hover:underline"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>

//               {errors.password?.type === "required" && (
//                 <p className="text-red-500 text-xs mt-1">
//                   Password is required
//                 </p>
//               )}
//               {errors.password?.type === "minLength" && (
//                 <p className="text-red-500 text-xs mt-1">
//                   Must be at least 6 characters
//                 </p>
//               )}
//               {errors.password?.type === "pattern" && (
//                 <p className="text-red-500 text-xs mt-1">
//                   Include uppercase, lowercase & symbol
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition"
//             >
//               Create Account
//             </button>
//             {/* sosial login */}
//             <SosialLogin></SosialLogin>
//             {/* Login Link */}
//             <p className="text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-purple-600 font-semibold hover:underline"
//               >
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SosialLogin from "./SosialLogin";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistation = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_Api_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(image_Api_URL, formData).then((res) => {
          const photoURL = res.data.data.url;
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in database");
            }
          });

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile update done");
            })
            .catch((err) => console.log(err));
        });

        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200 transition-colors duration-500 py-10">
      <title>Register | ClubSphere</title>

      <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-content/5">
        {/* Header - Vibrant Gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
          <h2 className="text-3xl font-black text-white">Create Account</h2>
          <p className="text-sm text-purple-100 mt-2 opacity-80">
            Join us and start your journey
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form
            onSubmit={handleSubmit(handleRegistation)}
            className="space-y-5"
          >
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content/70">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full bg-base-200 focus:input-primary transition-all rounded-xl"
                placeholder="John Doe"
              />
              {errors.name && (
                <span className="text-error text-xs mt-1 font-medium">
                  Name is required
                </span>
              )}
            </div>

            {/* Photo Upload Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content/70">
                  Profile Photo
                </span>
              </label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered w-full bg-base-200 rounded-xl"
              />
              {errors.photo && (
                <span className="text-error text-xs mt-1 font-medium">
                  Photo is required
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content/70">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full bg-base-200 focus:input-primary transition-all rounded-xl"
                placeholder="name@example.com"
              />
              {errors.email && (
                <span className="text-error text-xs mt-1 font-medium">
                  Email is required
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content/70">
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                  })}
                  className="input input-bordered w-full bg-base-200 focus:input-primary transition-all rounded-xl pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary font-bold text-xs hover:underline"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              {errors.password && (
                <div className="mt-1 space-y-1">
                  {errors.password.type === "required" && (
                    <p className="text-error text-xs font-medium">
                      Password is required
                    </p>
                  )}
                  {errors.password.type === "minLength" && (
                    <p className="text-error text-xs font-medium">
                      Must be at least 6 characters
                    </p>
                  )}
                  {errors.password.type === "pattern" && (
                    <p className="text-error text-xs font-medium">
                      Add Uppercase, Lowercase & Symbol
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full text-white font-bold rounded-xl shadow-lg shadow-primary/20 bg-gradient-to-r from-purple-600 to-blue-600 border-none hover:opacity-90"
            >
              Create Account
            </button>

            {/* Social Login Divider */}
            <div className="divider text-[10px] text-base-content/30 uppercase font-bold tracking-widest">
              Or Sign Up With
            </div>

            <SosialLogin />

            {/* Login Link */}
            <p className="text-center text-sm text-base-content/60 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-bold hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
