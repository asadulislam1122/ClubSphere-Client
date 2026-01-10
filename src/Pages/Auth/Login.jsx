// import React from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import { Link, useNavigate } from "react-router";
// import SosialLogin from "./SosialLogin";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const { signInUser, forgotPassword } = useAuth();
//   const email = watch("email");

//   const handleLogin = (data) => {
//     signInUser(data.email, data.password)
//       .then((result) => {
//         console.log(result.user);
//         toast.success("Login Sucessfully");
//         navigate("/");
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       });
//   };

//   const handleForgotPassword = () => {
//     if (!email) {
//       toast.success("Please enter your email first");
//       return;
//     }

//     forgotPassword(email)
//       .then(() => {
//         toast.success("Password reset email sent!");
//       })
//       .catch((error) => {
//         console.log(error.message);
//         toast.error(error.message);
//       });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  px-4">
//       <title>ClubSphere-Login-Page</title>
//       <div className="w-full max-w-md  rounded-2xl shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-blue-600 p-6 text-center">
//           <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>
//           <p className="text-sm text-blue-100 mt-1">Login to your account</p>
//         </div>

//         {/* Form */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
//             {/* Email */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 {...register("email", { required: true })}
//                 className="input input-bordered w-full mt-1"
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
//               <input
//                 type="password"
//                 {...register("password", {
//                   required: true,
//                   minLength: 6,
//                   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
//                 })}
//                 className="input input-bordered w-full mt-1"
//                 placeholder="••••••••"
//               />
//               {errors.password?.type === "required" && (
//                 <p className="text-red-500 text-xs mt-1">
//                   Password is required
//                 </p>
//               )}
//               {errors.password?.type === "minLength" && (
//                 <p className="text-red-500 text-xs mt-1">
//                   Minimum 6 characters
//                 </p>
//               )}
//               {errors.password?.type === "pattern" && (
//                 <p className="text-red-500 text-xs mt-1">
//                   Uppercase, lowercase & symbol required
//                 </p>
//               )}
//             </div>

//             {/* Forgot Password */}
//             <div className="text-right">
//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//             >
//               Login
//             </button>

//             {/* sosial login */}
//             <SosialLogin></SosialLogin>

//             {/* Register */}
//             <p className="text-center text-sm text-gray-600 mt-3">
//               Don’t have an account?{" "}
//               <Link
//                 to="/register"
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Register
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router"; // নোট: এটি react-router-dom হতে পারে আপনার প্রজেক্ট অনুযায়ী
import SosialLogin from "./SosialLogin";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signInUser, forgotPassword } = useAuth();
  const email = watch("email");

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.warning("Please enter your email first");
      return;
    }

    forgotPassword(email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200 transition-colors duration-500">
      <title>Login | ClubSphere</title>

      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-content/5">
        {/* Header - Gradient ব্যবহার করা হয়েছে যা সব মোডেই সুন্দর দেখায় */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="text-sm text-blue-100 mt-2 opacity-80">
            Login to your account
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
                className="input input-bordered w-full bg-base-200 focus:input-primary transition-all"
                placeholder="name@company.com"
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
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                })}
                className="input input-bordered w-full bg-base-200 focus:input-primary transition-all"
                placeholder="••••••••"
              />
              {errors.password && (
                <div className="mt-1 space-y-1">
                  {errors.password.type === "required" && (
                    <p className="text-error text-xs">Password is required</p>
                  )}
                  {errors.password.type === "minLength" && (
                    <p className="text-error text-xs">Minimum 6 characters</p>
                  )}
                  {errors.password.type === "pattern" && (
                    <p className="text-error text-xs">
                      Must include Uppercase, Lowercase & Symbol
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary font-semibold hover:link transition-all"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn cursor-pointer  btn-primary w-full text-white font-bold rounded-xl shadow-lg shadow-primary/20"
            >
              Login
            </button>

            {/* Social Login Divider */}
            <div className="divider text-xs text-base-content/30 uppercase font-bold tracking-widest">
              Or continue with
            </div>

            <SosialLogin />

            {/* Register Link */}
            <p className="text-center text-sm text-base-content/60 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
