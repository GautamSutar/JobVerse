// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FiX, FiClock } from "react-icons/fi";

// const ScheduleInterviewModal = ({
//   isOpen,
//   onClose,
//   applicant,
//   onInterviewScheduled,
// }) => {
//   const [scheduledTime, setScheduledTime] = useState("");
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("authToken");

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       job_applications: applicant.id,
//       scheduled_time: scheduledTime,
//     };

//     try {
//       const response = await axios.post(
//         `${
//           import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
//         }/interview/schedule-interview/`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Interview Scheduled!",
//         text: response.data.message,
//         timer: 3000,
//         showConfirmButton: false,
//       });

//       // Pass scheduled data back to parent
//       onInterviewScheduled(applicant.id, response.data.data);
//       onClose();
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.error || "Failed to schedule the interview.";
//       Swal.fire("Error", errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applicantName = `${applicant.student.first_name} ${applicant.student.last_name}`;

//   return (
//     <div
//       className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-800">
//             Schedule Interview
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
//           >
//             <FiX size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="mb-6">
//             <p className="text-gray-600">
//               You are scheduling an interview for:
//             </p>
//             <p className="font-bold text-lg text-indigo-600">{applicantName}</p>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="scheduledTime"
//               className="block text-sm font-semibold text-gray-700 mb-2"
//             >
//               Select Interview Date and Time *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiClock className="text-gray-400" />
//               </div>
//               <input
//                 id="scheduledTime"
//                 type="datetime-local"
//                 value={scheduledTime}
//                 onChange={(e) => setScheduledTime(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center"
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     ></path>
//                   </svg>
//                   Scheduling...
//                 </>
//               ) : (
//                 "Confirm & Send Invite"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ScheduleInterviewModal;
