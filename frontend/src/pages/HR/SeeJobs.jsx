import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import CreateJob from "./CreateJob";

const SeeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const token = localStorage.getItem("authToken");
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");
  const cacheKey = email ? `hrJobs_${email}` : null;

  useEffect(() => {
    const loadJobs = async () => {
      if (!token || !email || !cacheKey) return;

      // Clear old HR user's cached jobs
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("hrJobs_") && key !== cacheKey) {
          localStorage.removeItem(key);
        }
      });

      // Check cache
      const cached = localStorage.getItem(cacheKey);
      let parsed = null;
      let isExpired = true;

      if (cached) {
        try {
          parsed = JSON.parse(cached);
          isExpired = Date.now() - parsed.timestamp > 5 * 60 * 1000;

          if (parsed.email !== email) {
            console.warn("Cache email mismatch. Clearing it.");
            localStorage.removeItem(cacheKey);
            parsed = null;
          }
        } catch (err) {
          console.error("Failed to parse cache:", err);
        }
      }

      if (parsed && !isExpired) {
        setJobs(parsed.data || []);
        setLoading(false);
      } else {
        try {
          const res = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/job/list-all-jobs`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setJobs(res.data);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: res.data,
              timestamp: Date.now(),
              email: email,
            })
          );
        } catch (err) {
          console.error("Failed to fetch jobs:", err);
          setError("Failed to fetch jobs");
        } finally {
          setLoading(false);
        }
      }
    };

    loadJobs();
  }, [email, token, cacheKey]);

  // DELETE Job
  const handleDelete = async (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/job/delete-job/${jobId}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const updatedJobs = jobs.filter((job) => job.id !== jobId);
          setJobs(updatedJobs);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: updatedJobs,
              timestamp: Date.now(),
              email: email,
            })
          );
          Swal.fire("Deleted!", "The job has been deleted.", "success");
        } catch (err) {
          Swal.fire(
            "Error",
            err.response?.data?.detail || "Failed to delete job",
            "error"
          );
        }
      }
    });
  };

  const handleEditClick = (job) => setEditingJob(job);
  const handleModalClose = () => setEditingJob(null);

  const handleJobUpdate = (updatedJob) => {
    const updatedJobs = jobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobs(updatedJobs);
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: updatedJobs,
        timestamp: Date.now(),
        email: email,
      })
    );
    setEditingJob(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Your Created Jobs
        </h2>
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">You haven't posted any jobs yet.</p>
            <p className="text-sm text-gray-500 mt-2">Create a new job to get started.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-indigo-600 font-medium text-sm mb-1">{job.domain}</p>
                    <p className="text-xs text-gray-500 mb-3">
                      Posted on {new Date(job.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
                      <p className="flex items-center"><span className="mr-2">🛠</span> Skills: {job.skills_required || "Not specified"}</p>
                      <p className="flex items-center"><span className="mr-2">⏳</span> Duration: {job.start_date} to {job.end_date}</p>
                    </div>
                  </div>
                  {role === "hr" && (
                    <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                      <button
                        onClick={() => handleEditClick(job)}
                        className="flex items-center justify-center p-3 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors"
                        aria-label="Edit job"
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="flex items-center justify-center p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        aria-label="Delete job"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingJob && (
        <CreateJob
          isEdit={true}
          jobId={editingJob.id}
          initialData={editingJob}
          onSubmit={handleJobUpdate}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default SeeJobs;