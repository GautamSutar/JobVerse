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
  FiLoader,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
} from "react-icons/fi";
import Swal from "sweetalert2";
import CreateJob from "./CreateJob";
import { useAuthStore } from "../../store/authStore/authStore";
import axiosInstance from "../../store/api/axiosInstance";

// Read More Component (Unchanged)
const ReadMore = ({ text, maxLength = 250 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!text || text.length <= maxLength) {
    return <p className="text-gray-600 text-sm">{text || "Not specified."}</p>;
  }
  return (
    <div>
      <p className="text-gray-600 text-sm">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 mt-2"
      >
        {isExpanded ? "Read Less" : "Read More"}
        {isExpanded ? (
          <FiChevronUp className="ml-1" />
        ) : (
          <FiChevronDown className="ml-1" />
        )}
      </button>
    </div>
  );
};

// Helper function to render comma-separated lists
const renderList = (items) => {
  if (!items) return <p className="text-gray-600 text-sm">Not specified.</p>;
  return (
    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
      {items.split(",").map((item, index) => (
        <li key={index}>{item.trim()}</li>
      ))}
    </ul>
  );
};

// Helper function to render semicolon-separated lists (for questions)
const renderNumberedList = (items) => {
  if (!items) return <p className="text-gray-600 text-sm">Not specified.</p>;
  return (
    <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
      {items.split(";").map((item, index) => (
        <li key={index}>{item.trim()}</li>
      ))}
    </ol>
  );
};

// --- NEW JobCard Component with Expand/Collapse Logic ---
const JobCard = ({ job, onEditClick, onDeleteClick, role }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <div className="bg-white p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Posted on {new Date(job.created_at).toLocaleDateString()}
          </p>
        </div>
        {role === "hr" && (
          <div className="flex items-center gap-3 mt-4 sm:mt-0 flex-shrink-0">
            <button
              onClick={() => onEditClick(job)}
              className="p-3 rounded-full text-gray-600 bg-gray-100 hover:bg-yellow-100 hover:text-yellow-600 transition-colors"
              aria-label="Edit job"
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={() => onDeleteClick(job.id)}
              className="p-3 rounded-full text-gray-600 bg-gray-100 hover:bg-red-100 hover:text-red-600 transition-colors"
              aria-label="Delete job"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Always Visible Section */}
        <div className="border-b pb-4">
          <h4 className="text-lg font-semibold text-indigo-700 mb-3">
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

        {/* Expandable Section */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[2000px] opacity-100 pt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-6">
            {/* Description & Responsibilities */}
            <div>
              <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                Description
              </h4>
              <ReadMore text={job.description} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                Responsibilities
              </h4>
              {renderList(job.responsibilities)}
            </div>

            {/* Who Can Apply */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                Who Can Apply
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p className="flex items-start">
                  <FiTrendingUp className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                  <div>
                    <strong>Experience:</strong> {job.experience_level}
                  </div>
                </p>
                <p className="flex items-start">
                  <FiFileText className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                  <div>
                    <strong>Degrees/Streams:</strong> {job.degrees_or_streams}
                  </div>
                </p>
                <p className="flex items-start">
                  <FiCalendar className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                  <div>
                    <strong>Graduation Years:</strong> {job.graduation_years}
                  </div>
                </p>
                <p className="flex items-start">
                  <FiCheckSquare className="mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                  <div>
                    <strong>Women Re-entry:</strong>{" "}
                    {job.women_reentry ? "Yes" : "No"}
                  </div>
                </p>
                <div className="col-span-full">
                  <h5 className="font-semibold mb-1 text-gray-800">
                    Skills Required:
                  </h5>
                  {renderList(job.skills_required)}
                </div>
                <div className="col-span-full">
                  <h5 className="font-semibold mb-1 text-gray-800">
                    Eligibility:
                  </h5>
                  <p className="text-gray-600 text-sm">{job.who_can_apply}</p>
                </div>
              </div>
            </div>

            {/* Salary & Perks */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                Salary & Perks
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p className="flex items-center">
                  <FiDollarSign className="mr-2 text-indigo-500" />
                  <strong>Salary/Stipend:</strong> {job.salary_or_stipend}
                </p>
                <p className="flex items-center">
                  <FiTrendingUp className="mr-2 text-indigo-500" />
                  <strong>PPO Available:</strong>{" "}
                  {job.ppo_available ? "Yes" : "No"}
                </p>
                <div className="col-span-full">
                  <h5 className="font-semibold mb-1 text-gray-800">Perks:</h5>
                  {renderList(job.perks)}
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                Application Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <strong>Application Deadline:</strong>{" "}
                  {new Date(job.application_deadline).toLocaleDateString()}
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
                  <h5 className="font-semibold mb-1 text-gray-800">
                    Cover Letter Question:
                  </h5>
                  <p className="italic text-gray-600 text-sm">
                    "{job.cover_letter_question}"
                  </p>
                </div>
                <div className="col-span-full">
                  <h5 className="font-semibold mb-1 text-gray-800">
                    Assessment Questions:
                  </h5>
                  {renderNumberedList(job.assessment_questions)}
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="border-t pt-4 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                About {job.company_name}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{job.about_company}</p>
              {job.company_website && (
                <a
                  href={job.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-indigo-600 hover:underline"
                >
                  <FiGlobe className="mr-2" /> Visit Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* See More/Less Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex  cursor-pointer items-center text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            {isExpanded ? "Show Less" : "Show More Details"}
            {isExpanded ? (
              <FiChevronUp className="ml-2" />
            ) : (
              <FiChevronDown className="ml-2" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const SeeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  // Unchanged logic from here...
  const token = useAuthStore.getState().accessToken;
  const email = useAuthStore.getState().email;
  const role = useAuthStore.getState().role;
  const first_name = useAuthStore.getState().first_name;
  const last_name = useAuthStore.getState().last_name;
  const cacheKey = email ? `hrJobs_${email}` : null;

  useEffect(() => {
    const loadJobs = async () => {
      if (!token || !email || !cacheKey) {
        setLoading(false);
        return;
      }
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
          const res = await axiosInstance.get("job/list-all-jobs/");
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
          await axiosInstance.delete(`job/delete-job/${jobId}/`);
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
  const handleModalClose = () => {
    setEditingJob(null);
    setIsCreatingJob(false);
  };
  const handleJobUpdate = (updatedJob) => {
    const updatedJobs = jobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobs(updatedJobs);
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: updatedJobs, timestamp: Date.now(), email: email })
    );
    handleModalClose();
  };
  const handleJobCreated = (newJob) => {
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: updatedJobs, timestamp: Date.now(), email: email })
    );
    handleModalClose();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <FiLoader className="animate-spin text-5xl text-indigo-600" />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-indigo-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Hi, {first_name} {last_name}👋
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Here are all the jobs you've posted.
              </p>
            </div>
            <button
              onClick={() => setIsCreatingJob(true)}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all"
            >
              <FiPlus /> Create New Job
            </button>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-16 -mt-8">
        {jobs.length === 0 ? (
          <div className="text-center bg-white p-16 rounded-xl shadow-md border border-gray-100">
            <FiBriefcase className="mx-auto text-5xl text-indigo-300" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-800">
              No Jobs Posted Yet
            </h2>
            <p className="mt-2 text-gray-500">
              Click the "Create New Job" button to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                role={role}
                onEditClick={handleEditClick}
                onDeleteClick={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      {(editingJob || isCreatingJob) && (
        <CreateJob
          isEdit={!!editingJob}
          jobId={editingJob?.id}
          initialData={editingJob}
          onSubmit={editingJob ? handleJobUpdate : handleJobCreated}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default SeeJobs;
