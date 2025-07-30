import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiEdit,
  FiTrash2,
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiMessageSquare,
  FiCheckSquare,
  FiGlobe,
  FiFileText,
} from "react-icons/fi";
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
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const cacheKey = email ? `hrJobs_${email}` : null;

  useEffect(() => {
    const loadJobs = async () => {
      if (!token || !email || !cacheKey) return;

      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("hrJobs_") && key !== cacheKey) {
          localStorage.removeItem(key);
        }
      });

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

  const renderResponsibilities = (responsibilities) => {
    if (!responsibilities) return <p>Not specified.</p>;
    const list = responsibilities.split(",").map((item) => item.trim());
    return (
      <ul className="list-disc list-inside space-y-1">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  const renderAssessmentQuestions = (questions) => {
    if (!questions) return <p>No assessment questions provided.</p>;
    const list = questions.split(";").map((item) => item.trim());
    return (
      <ul className="list-decimal list-inside space-y-2">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          <span>
            Hi👋, {first_name} {last_name}
          </span>
          , Here Are Your Created Jobs
        </h2>
        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white shadow-md rounded-lg">
            <p className="text-xl text-gray-600">
              You haven't posted any jobs yet.
            </p>
            <p className="text-md text-gray-500 mt-2">
              Create a new job to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl"
              >
                {/* Header */}
                <div className="bg-indigo-600 text-white p-4 sm:p-6 rounded-t-xl flex flex-col sm:flex-row justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">{job.title}</h3>
                    <p className="text-sm text-indigo-200">
                      Posted on {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {role === "hr" && (
                    <div className="flex items-center gap-3 mt-4 sm:mt-0 flex-shrink-0">
                      <button
                        onClick={() => handleEditClick(job)}
                        className="flex items-center justify-center p-3 rounded-full bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
                        aria-label="Edit job"
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="flex items-center justify-center p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                        aria-label="Delete job"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-6">
                  {/* Job Overview Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Job Overview
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                      <div className="flex items-center">
                        <FiBriefcase className="mr-2 text-indigo-500" />
                        <span>{job.category}</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-2 text-indigo-500" />
                        <span className="capitalize">
                          {job.time_commitment?.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="mr-2 text-indigo-500" />
                        <span>{job.location || job.job_type}</span>
                      </div>
                      <div className="flex items-center">
                        <FiUsers className="mr-2 text-indigo-500" />
                        <span>{job.openings} Openings</span>
                      </div>
                    </div>
                  </div>

                  {/* Description and Responsibilities */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {job.description}
                    </p>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Responsibilities
                    </h4>
                    <div className="text-gray-600 text-sm">
                      {renderResponsibilities(job.responsibilities)}
                    </div>
                  </div>

                  {/* Who Can Apply Section */}
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Who Can Apply
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <p className="flex items-start">
                        <FiAward className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                        <div>
                          <strong>Skills Required:</strong>{" "}
                          {job.skills_required || "Not specified"}
                        </div>
                      </p>
                      <p className="flex items-start">
                        <FiTrendingUp className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                        <div>
                          <strong>Experience:</strong> {job.experience_level}
                        </div>
                      </p>
                      <p className="flex items-start">
                        <FiFileText className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                        <div>
                          <strong>Degrees/Streams:</strong>{" "}
                          {job.degrees_or_streams}
                        </div>
                      </p>
                      <p className="flex items-start">
                        <FiCalendar className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                        <div>
                          <strong>Graduation Years:</strong>{" "}
                          {job.graduation_years}
                        </div>
                      </p>
                      <p className="flex items-start">
                        <FiCheckSquare className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                        <div>
                          <strong>Women Re-entry:</strong>{" "}
                          {job.women_reentry ? "Yes" : "No"}
                        </div>
                      </p>
                      <p className="flex items-start col-span-full">
                        <FiMessageSquare className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                        <div>
                          <strong>Eligibility:</strong> {job.who_can_apply}
                        </div>
                      </p>
                    </div>
                  </div>

                  {/* Salary & Perks */}
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Salary & Perks
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <p className="flex items-center">
                        <FiDollarSign className="mr-2 text-indigo-500" />
                        <strong>Salary/Stipend:</strong> {job.salary_or_stipend}
                      </p>
                      <p className="flex items-center">
                        <FiAward className="mr-2 text-indigo-500" />
                        <strong>Perks:</strong> {job.perks}
                      </p>
                      <p className="flex items-center">
                        <FiTrendingUp className="mr-2 text-indigo-500" />
                        <strong>PPO Available:</strong>{" "}
                        {job.ppo_available ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Application Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <p>
                        <strong>Application Deadline:</strong>{" "}
                        {new Date(
                          job.application_deadline
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Start Date:</strong>{" "}
                        {new Date(job.start_date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Duration:</strong> {job.duration}
                      </p>
                      <p>
                        <strong>Resume Required:</strong>{" "}
                        {job.require_resume ? "Yes" : "No"}
                      </p>
                      <div className="col-span-full">
                        <h5 className="font-semibold mb-1">
                          Cover Letter Question:
                        </h5>
                        <p className="italic text-gray-600">
                          "{job.cover_letter_question}"
                        </p>
                      </div>
                      <div className="col-span-full">
                        <h5 className="font-semibold mb-1">
                          Assessment Questions:
                        </h5>
                        <div className="text-gray-600">
                          {renderAssessmentQuestions(job.assessment_questions)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="border-t pt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      About {job.company_name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {job.about_company}
                    </p>
                    {job.company_website && (
                      <a
                        href={job.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-indigo-600 hover:underline"
                      >
                        <FiGlobe className="mr-2" />
                        Visit Website
                      </a>
                    )}
                  </div>
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
