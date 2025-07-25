import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import CreateJob from "./CreateJob";

const SeeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null); // for modal
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) {
        setError("You must be logged in to view jobs.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/job/list-all-jobs/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [token]);

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
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
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
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    setEditingJob(null);
  };

  if (loading) return <p className="text-center mt-6">Loading jobs...</p>;
  if (error)
    return <p className="text-center mt-6 text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Job Openings
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
