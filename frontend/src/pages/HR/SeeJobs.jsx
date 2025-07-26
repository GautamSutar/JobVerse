import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import CreateJob from "./CreateJob";
import { resolveElements } from "framer-motion";

const SeeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");
  const email = localStorage.getItem("userEmail");
  console.log(email);
  console.log(role);
  const cacheKey = email ? `hrJobs_${email}` : null;

  useEffect(() => {
    if (!email || !cacheKey || !token) {
      console.warn("Missing email/token/cacheKey → skipping job fetch");
      return;
    }

    const loadJobs = async () => {
      const cached = localStorage.getItem(cacheKey);
      let isExpired = true;
      let parsed = null;

      if (cached) {
        try {
          parsed = JSON.parse(cached);
          isExpired = Date.now() - parsed.timestamp > 5 * 60 * 1000;
          if (parsed.email !== email) {
            console.log("❌ Email mismatch. Clearing old HR cache.");
            localStorage.removeItem(cacheKey);
            parsed = null;
            isExpired = true;
          }
        } catch (err) {
          console.error("Failed to parse cached data", err);
        }
      }
      if (parsed && !isExpired) {
        console.log("✅ Loaded fresh cache for HR:", email);
        setJobs(parsed.data || [])
        setLoading(false);
      }
      else {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/job/list-all-jobs`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setJobs(response.data);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: response.data,
              timestamp: Date.now(),
              email: email
            })
          )
        } catch (err) {
          console.error("❌ Failed to fetch jobs", err);
          setError("Failed to fetch jobs");
        } finally {
          setLoading(false);
        }
      }
    };

    loadJobs();
  }, [email, cacheKey, token]);

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
            JSON.stringify({ data: updatedJobs, timestamp: Date.now() })
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
      JSON.stringify({ data: updatedJobs, timestamp: Date.now() })
    );
    setEditingJob(null);
  };

  if (loading) return <p className="text-center mt-6">Loading jobs...</p>;
  if (error)
    return <p className="text-center mt-6 text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Created Jobs
        </h2>
        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs available.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex justify-between items-center bg-white rounded-xl shadow-md hover:shadow-lg transition p-5"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {job.domain} • Posted on{" "}
                    {new Date(job.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Skills:</strong>{" "}
                    {job.skills_required || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Duration:</strong> {job.start_date} - {job.end_date}
                  </p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {job.description}
                  </p>
                </div>
                {role === "hr" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditClick(job)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                )}
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
