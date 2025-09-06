// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
// import axiosInstance from "../../store/api/axiosInstance";
// import { useAuthStore } from "../../store/authStore/authStore";
// import InputField from "../../components/InputField/InputField";
// import { TEST_IDS } from "../../../tests/utils/test-ids";
// const InputField = ({ icon, name, type, placeholder, register, error }) => {
//   const Icon = icon;
//   return (
//     <div>
//       <div className="relative">
//         <Icon className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
//         <input
//           {...register(name, { required: `${placeholder} is required` })}
//           type={type}
//           placeholder={placeholder}
//           className={`w-full border rounded-lg pl-12 pr-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 transition-colors ${
//             error
//               ? "border-red-500 focus:ring-red-400"
//               : "border-gray-200 focus:ring-indigo-400"
//           }`}
//         />
//       </div>
//       {error && (
//         <p className="text-red-500 text-sm mt-1 ml-1">{error.message}</p>
//       )}
//     </div>
//   );
// };
// export default function LoginForm() {
//   const login = useAuthStore((state) => state.login);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   const onSubmit = async (data) => {
//     try {
//       // const response = await axios.post(`${API_URL}/auth/login/`, data);
//       const response = await axiosInstance.post("auth/login/", data);
//       const { accessToken, role, refreshToken, email, first_name, last_name } =
//         response.data;
//       console.log("Login Acess Token :", accessToken);
//       login({
//         first_name,
//         last_name,
//         email,
//         role,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//       });
//       toast.success("Login successful! Redirecting...", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "colored",
//       });
//       window.dispatchEvent(new Event("authChange"));
//       setTimeout(() => {
//         if (role === "student") navigate("/student-dashboard");
//         else if (role === "hr") navigate("/hr-dashboard");
//       }, 2000);
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.detail ||
//         "Login failed. Please check your credentials.";
//       toast.error(errorMsg, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//       console.error("Login failed:", errorMsg);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <ToastContainer />
//       <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
//         {/* Left Side - Branding */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 text-white bg-indigo-600 flex flex-col justify-center items-center text-center relative">
//           {/* Abstract background pattern */}
//           <div className="absolute inset-0 bg-opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
//           <div className="relative z-10">
//             <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
//             <p className="text-lg text-indigo-200 mb-8">
//               Sign in to continue your journey with Job Verse and unlock your
//               potential.
//             </p>
//             <video
//               className="w-32 mx-auto rounded-full"
//               autoPlay
//               muted
//               loop
//               playsInline
//               data-testid={TEST_IDS.login.logoVideo}
//             >
//               <source src="/assets/images/Logo/logo2.mp4" type="video/mp4" />
//             </video>
//             <div className="mt-8">
//               <p className="text-indigo-200">Don't have an account?</p>
//               <Link
//                 to="/signup"
//                 className="mt-2 inline-block bg-white text-indigo-600 font-bold py-2 px-6 rounded-full hover:bg-indigo-100 transition-colors"
//                 data-testid={TEST_IDS.login.signupLink}
//               >
//                 Sign Up Now
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
//           <p className="text-gray-500 mb-8">
//             Please enter your details to login.
//           </p>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <InputField
//               icon={FiMail}
//               name="email"
//               type="email"
//               placeholder="Email Address"  dataTestId={TEST_IDS.login.emailInput}
//               register={register}
//               error={errors.email}
//             />
//             <div>
//               <div className="relative">
//                 <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register("password", {
//                     required: "Password is required",
//                   })}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password" data-testid={TEST_IDS.login.passwordInput}
//                   className={`w-full border rounded-lg pl-12 pr-12 py-3 bg-gray-50 focus:outline-none focus:ring-2 transition-colors ${
//                     errors.password
//                       ? "border-red-500 focus:ring-red-400"
//                       : "border-gray-200 focus:ring-indigo-400"
//                   }`}  
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!-showPassword)}
//                   className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-indigo-600" data-testid={TEST_IDS.login.togglePasswordVisibilityButton}
//                 >
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1 ml-1 data-testid={TEST_IDS.login.passwordError}">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//             <div className="text-right">
//               <a
//                 href="#"
//                 className="text-sm font-medium text-indigo-600 hover:underline"
//                 data-testid={TEST_IDS.login.forgotPasswordLink}
//               >
//                 Forgot Password?
//               </a>
//             </div>
//             <div className="pt-2">
//               <button
//                 type="submit"
//                 data-testid={TEST_IDS.login.submitButton}
//                 className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center justify-center gap-2"
//               >
//                 <FiLogIn />
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





// // pages/Auth/LoginForm.jsx
// // ... (imports remain the same)
// import InputField from "../../components/InputField/InputField"; // Make sure to import it
// import { TEST_IDS } from "../../tests/utils/test-ids"; // Import test IDs

// export default function LoginForm() {
//   const login = useAuthStore((state) => state.login);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   // ... (onSubmit function remains the same)

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <ToastContainer />
//       <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
//         {/* Left Side - Branding */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 text-white bg-indigo-600 flex flex-col justify-center items-center text-center relative">
//           <div className="absolute inset-0 bg-opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
//           <div className="relative z-10">
//             <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
//             <p className="text-lg text-indigo-200 mb-8">
//               Sign in to continue your journey with Job Verse and unlock your
//               potential.
//             </p>
//             <video
//               className="w-32 mx-auto rounded-full"
//               autoPlay
//               muted
//               loop
//               playsInline
//               data-testid={TEST_IDS.login.logoVideo} // Add data-testid
//             >
//               <source src="/assets/images/Logo/logo2.mp4" type="video/mp4" />
//             </video>
//             <div className="mt-8">
//               <p className="text-indigo-200">Don't have an account?</p>
//               <Link
//                 to="/signup"
//                 data-testid={TEST_IDS.login.signupLink} // Add data-testid
//                 className="mt-2 inline-block bg-white text-indigo-600 font-bold py-2 px-6 rounded-full hover:bg-indigo-100 transition-colors"
//               >
//                 Sign Up Now
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2" data-testid={TEST_IDS.login.title}>Sign In</h2>
//           <p className="text-gray-500 mb-8">
//             Please enter your details to login.
//           </p>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid={TEST_IDS.login.form}> {/* Add for the form itself */}
//             <InputField
//               icon={FiMail}
//               name="email"
//               type="email"
//               placeholder="Email Address"
//               register={register}
//               error={errors.email}
//               dataTestId={TEST_IDS.login.emailInput} // Pass the data-testid
//             />
//             <div>
//               <div className="relative">
//                 <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register("password", {
//                     required: "Password is required",
//                   })}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   data-testid={TEST_IDS.login.passwordInput} // Add data-testid
//                   className={`w-full border rounded-lg pl-12 pr-12 py-3 bg-gray-50 focus:outline-none focus:ring-2 transition-colors ${
//                     errors.password
//                       ? "border-red-500 focus:ring-red-400"
//                       : "border-gray-200 focus:ring-indigo-400"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
//                   data-testid={TEST_IDS.login.togglePasswordVisibilityButton} // Add data-testid
//                 >
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1 ml-1" data-testid={TEST_IDS.login.passwordError}>
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//             <div className="text-right">
//               <Link // Changed from <a> to <Link> if part of react-router
//                 to="/forgot-password" // Assuming this route exists
//                 data-testid={TEST_IDS.login.forgotPasswordLink} // Add data-testid
//                 className="text-sm font-medium text-indigo-600 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//             <div className="pt-2">
//               <button
//                 type="submit"
//                 data-testid={TEST_IDS.login.submitButton} // Add data-testid
//                 className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center justify-center gap-2"
//               >
//                 <FiLogIn />
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }