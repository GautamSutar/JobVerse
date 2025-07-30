// import React from "react";
// import { FiMail, FiFileText, FiCalendar, FiCheckCircle } from "react-icons/fi";

// const ApplicantCard = ({ applicant, onScheduleClick }) => {
//   const {
//     student,
//     applied_at,
//     resume,
//     is_interview_scheduled,
//     schedule_details,
//   } = applicant;
//   const fullName = student
//     ? `${student.first_name} ${student.last_name}`.trim()
//     : "N/A";

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between">
//       <div>
//         <h3 className="text-xl font-bold text-gray-900">{fullName}</h3>
//         <p className="text-sm text-gray-500 mb-4">
//           Applied on: {new Date(applied_at).toLocaleDateString()}
//         </p>

//         <div className="space-y-3 text-sm mb-6">
//           <a
//             href={`mailto:${student?.email}`}
//             className="flex items-center text-gray-700 hover:text-indigo-600"
//           >
//             <FiMail className="mr-3 text-gray-400" size={16} />
//             {student?.email}
//           </a>
//           <a
//             href={resume}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center text-gray-700 hover:text-indigo-600"
//           >
//             <FiFileText className="mr-3 text-gray-400" size={16} />
//             View Resume
//           </a>
//         </div>
//       </div>

//       <div className="mt-4 pt-4 border-t border-gray-200">
//         {is_interview_scheduled ? (
//           <div className="flex items-center text-green-600 font-semibold p-3 bg-green-50 rounded-lg">
//             <FiCheckCircle className="mr-3" size={20} />
//             <div>
//               <p>Interview Scheduled</p>
//               {schedule_details && (
//                 <p className="text-xs font-normal">
//                   {new Date(schedule_details.scheduled_time).toLocaleString()}
//                 </p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={onScheduleClick}
//             className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             <FiCalendar className="mr-2" />
//             Schedule Interview
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplicantCard;
