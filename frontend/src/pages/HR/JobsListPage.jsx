import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiBriefcase, FiLoader } from "react-icons/fi";
import JobCard from "./JobCard";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";

const JobsListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useAuthStore((state)=> state.accessToken)

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // const response = await axios.get(
        //   `${
        //     import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        //   }/job/list-all-jobs/`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const response = await axiosInstance.get("job/list-all-jobs/");
        setJobs(response.data);
      } catch (err) {
        setError("Failed to load your job postings.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <FiLoader className="animate-spin text-indigo-600 text-5xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold bg-slate-50">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-indigo-100" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <FiBriefcase className="mx-auto text-5xl text-indigo-600 mb-3" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Your Job Postings
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Select a job from the list below to review its applicants and manage
            your hiring pipeline.
          </p>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 pb-16 -mt-8">
        {jobs.length > 0 ? (
          <div className="space-y-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-16 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              No Jobs Posted Yet
            </h2>
            <p className="mt-2 text-gray-500">
              When you create a job, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsListPage;
