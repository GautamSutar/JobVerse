import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ExploreJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("authToken");
  const email = localStorage.getItem("userEmail");
  const cacheKey = email ? `studentJobs_${email}` : null;
  const appliedJobsCacheKey = email ? `appliedJobs_${email}` : null;

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token || !email || !cacheKey) {
        window.location.href = "/login";
        return;
      }

      // Load applied job IDs from localStorage
      const cachedAppliedJobs = localStorage.getItem(appliedJobsCacheKey);
      if (cachedAppliedJobs) {
        setAppliedJobIds(new Set(JSON.parse(cachedAppliedJobs)));
      }

      // Clean cache for previous users
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("studentJobs_") && key !== cacheKey) {
          localStorage.removeItem(key);
        }
      });

      const cached = localStorage.getItem(cacheKey);
      let parsed = null;
      let isExpired = true;

      if (cached) {
        try {
          parsed = JSON.parse(cached);
          isExpired = Date.now() - parsed.timestamp > 10 * 60 * 1000; // 10 minutes
          if (parsed.email !== email) {
            localStorage.removeItem(cacheKey);
            parsed = null;
          }
        } catch (err) {
          console.error("Cache error:", err);
        }
      }

      if (parsed && !isExpired) {
        setJobs(parsed.data);
        setLoading(false);
      } else {
        try {
          const res = await axios.get(
            "http://127.0.0.1:8000/api/job/list-all-jobs-for-student/",
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
              email,
              timestamp: Date.now(),
            })
          );
        } catch (err) {
          console.error("Failed to fetch jobs:", err);
          Swal.fire("Error", "Unauthorized or token expired", "error");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobs();
  }, [email, cacheKey, token, appliedJobsCacheKey]);

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      Swal.fire("Validation Error", "Please select a resume file.", "warning");
      return;
    }

    if (!selectedJobId) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append("resume_file", resumeFile);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/job-applications/apply-job/${selectedJobId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newAppliedJobIds = new Set(appliedJobIds).add(selectedJobId);
      setAppliedJobIds(newAppliedJobIds);
      localStorage.setItem(
        appliedJobsCacheKey,
        JSON.stringify(Array.from(newAppliedJobIds))
      );

      setShowModal(false);
      Swal.fire({
        title: "🎉 Successfully Applied!",
        text: "Your resume has been submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("Failed to apply for the job:", err);
      const errorMessage =
        err.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      Swal.fire("Application Error", errorMessage, "error");
    } finally {
      setSubmitting(false);
      setResumeFile(null);
    }
  };

  return (
    <div className="flex min-h-screen mt-24 bg-gray-50">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 bg-white p-6 border-r hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-gray-800">🔍 Filters</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile
            </label>
            <input
              type="text"
              placeholder="e.g. Software Developer"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. New York"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Stipend
            </label>
            <input
              type="range"
              min={0}
              max={10000}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Duration
            </label>
            <input
              type="text"
              placeholder="e.g. 6 months"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2 pt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Job Offer</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Fast Response</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Early Applicant
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Women Only</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Job Listings */}
      <main className="w-full md:w-3/4 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🎯 Latest Job Opportunities
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No jobs available at the moment.
            </p>
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
                    <p className="text-indigo-600 font-medium text-sm mb-3">
                      {job.domain}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
                      <p>📅 Start: {job.start_date}</p>
                      <p>⏰ End: {job.end_date}</p>
                      <p>🛠 Skills: {job.skills_required}</p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                    <button
                      onClick={() => handleApplyClick(job.id)}
                      className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                        appliedJobIds.has(job.id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                      }`}
                      disabled={appliedJobIds.has(job.id)}
                    >
                      {appliedJobIds.has(job.id) ? "Applied" : "Apply Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Upload Your Resume
            </h3>
            <div className="mb-6">
              <label
                htmlFor="resume-upload"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select a file (.pdf, .doc, .docx)
              </label>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setShowModal(false)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                onClick={handleResumeUpload}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreJobsPage;
