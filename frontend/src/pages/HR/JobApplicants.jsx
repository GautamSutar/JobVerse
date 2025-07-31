// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FiUser,
//   FiMail,
//   FiFileText,
//   FiChevronDown,
//   FiChevronUp,
//   FiBriefcase,
// } from "react-icons/fi";

// // A reusable component to display each applicant's details
// const ApplicantDetails = ({ applicant }) => (
//   <div className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start hover:bg-gray-50 transition-colors">
//     <div className="flex items-center mb-3 sm:mb-0">
//       <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
//         <FiUser className="text-indigo-600" size={24} />
//       </div>
//       <div>
//         <h4 className="font-bold text-gray-800">
//           {`${applicant.student.first_name || ""} ${
//             applicant.student.last_name || ""
//           }`.trim() || "N/A"}
//         </h4>
//         <a
//           href={`mailto:${applicant.student.email}`}
//           className="text-sm text-gray-600 hover:text-indigo-600 flex items-center"
//         >
//           <FiMail className="mr-2" />
//           {applicant.student.email}
//         </a>
//       </div>
//     </div>
//     <a
//       href={applicant.resume}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100"
//     >
//       <FiFileText className="mr-2" />
//       View Resume
//     </a>
//   </div>
// );

// // A collapsible component for each job to show/hide its applicants
// const JobApplicantsSection = ({ job }) => {
//   const [applicants, setApplicants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const token = localStorage.getItem("authToken");

//   useEffect(() => {
//     // Only fetch applicants if the section is opened for the first time
//     if (isOpen && applicants.length === 0) {
//       const fetchApplicants = async () => {
//         try {
//           const response = await axios.get(
//             `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/job/${
//               job.id
//             }/applicants/`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setApplicants(response.data);
//         } catch (err) {
//           setError("Could not fetch applicants for this job.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchApplicants();
//     }
//   }, [isOpen, job.id, applicants.length, token]);

//   return (
//     <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
//       >
//         <div>
//           <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
//           <p className="text-sm text-indigo-600">{job.company_name}</p>
//         </div>
//         <div className="flex items-center">
//           <span className="text-sm font-semibold text-gray-600 mr-4">
//             {loading && isOpen
//               ? "Loading..."
//               : `${applicants.length} Applicants`}
//           </span>
//           {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
//         </div>
//       </button>

//       {isOpen && (
//         <div className="px-6 pb-6">
//           {loading && <p className="text-center py-4">Loading applicants...</p>}
//           {error && <p className="text-center text-red-500 py-4">{error}</p>}
//           {!loading && !error && (
//             <div className="space-y-4">
//               {applicants.length > 0 ? (
//                 applicants.map((applicant) => (
//                   <ApplicantDetails key={applicant.id} applicant={applicant} />
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500 py-4">
//                   No applicants found for this job.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const ShortlistedCandidatesPage = () => {
//   const [allJobs, setAllJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("authToken");

//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       try {
//         const response = await axios.get(
//           `${
//             import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
//           }/job/list-all-jobs/`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setAllJobs(response.data);
//       } catch (err) {
//         setError("Failed to load job postings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllJobs();
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-4"></div>
//         <p className="text-lg font-semibold text-gray-700">
//           Loading Job Postings...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-2xl text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-10">
//           <FiBriefcase className="mx-auto text-5xl text-indigo-600 mb-3" />
//           <h1 className="text-4xl font-bold text-gray-800">
//             All Job Applicants
//           </h1>
//           <p className="text-gray-500 mt-2">
//             View all candidates who have applied to your job postings.
//           </p>
//         </div>

//         {allJobs.length > 0 ? (
//           <div className="space-y-6">
//             {allJobs.map((job) => (
//               <JobApplicantsSection key={job.id} job={job} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-700">
//               No Jobs Found
//             </h2>
//             <p className="text-gray-500 mt-2">
//               You have not created any job postings yet.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobApplicantsSection;
