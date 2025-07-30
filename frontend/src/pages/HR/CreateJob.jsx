import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FiX,
  FiBriefcase,
  FiCode,
  FiFileText,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiAward,
  FiCheck,
  FiGlobe,
} from "react-icons/fi";

// Custom Toggle Switch Component
const ToggleSwitch = ({ label, name, checked, onChange }) => (
  <label htmlFor={name} className="flex items-center cursor-pointer">
    <div className="relative">
      <input
        id={name}
        name={name}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`block w-14 h-8 rounded-full transition ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        }`}
      ></div>
      <div
        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
          checked ? "transform translate-x-6" : ""
        }`}
      ></div>
    </div>
    <div className="ml-3 text-gray-700 font-medium">{label}</div>
  </label>
);

// Form Section Component
const FormSection = ({ title, children }) => (
  <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {children}
    </div>
  </div>
);

const CreateJob = ({ onSubmit, onClose, jobId, initialData, isEdit }) => {
  const [jobData, setJobData] = useState(
    initialData || {
      title: "",
      category: "Engineering",
      job_type: "remote",
      time_commitment: "full_time",
      description: "",
      responsibilities: "",
      openings: 1,
      skills_required: "",
      who_can_apply: "",
      graduation_years: "",
      degrees_or_streams: "",
      women_reentry: false,
      experience_level: "0-1 years",
      salary_or_stipend: "",
      location: "Work from Home",
      start_date: "",
      duration: "",
      application_deadline: "",
      perks: "",
      ppo_available: false,
      cover_letter_question: "",
      assessment_questions: "",
      require_resume: true,
      company_name: "",
      about_company: "",
      company_website: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  const navigateBack = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isEdit && initialData) {
      setJobData(initialData);
    }
  }, [isEdit, initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData({ ...jobData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      setLoading(false);
      return Swal.fire(
        "Authentication Error",
        "You must be logged in.",
        "error"
      );
    }

    try {
      const url = isEdit
        ? `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/job/update-job/${jobId}/`
        : `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/job/create/`;
      const method = isEdit ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: jobData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      await Swal.fire({
        icon: "success",
        title: isEdit ? "Job Updated!" : "Job Created!",
        text: `The job "${response.data.title}" has been saved successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });

      if (onSubmit) {
        onSubmit(response.data);
      }
      navigateBack();
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || "An unexpected error occurred.";
      setError(errorMessage);
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={navigateBack}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Job Posting" : "Create New Job Posting"}
          </h2>
          <button
            onClick={navigateBack}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <FormSection title="Job Details">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={jobData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Job Type *
              </label>
              <select
                name="job_type"
                value={jobData.job_type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              >
                <option value="remote">Remote</option>
                <option value="in_office">In Office</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Responsibilities
              </label>
              <textarea
                name="responsibilities"
                value={jobData.responsibilities}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter each responsibility on a new line or comma-separated"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              ></textarea>
            </div>
          </FormSection>

          <FormSection title="Requirements">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Skills Required *
              </label>
              <input
                type="text"
                name="skills_required"
                value={jobData.skills_required}
                onChange={handleInputChange}
                required
                placeholder="e.g., Python, React, SQL"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Experience Level
              </label>
              <input
                type="text"
                name="experience_level"
                value={jobData.experience_level}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Graduation Years
              </label>
              <input
                type="text"
                name="graduation_years"
                value={jobData.graduation_years}
                onChange={handleInputChange}
                placeholder="e.g., 2024, 2025"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Degrees or Streams
              </label>
              <input
                type="text"
                name="degrees_or_streams"
                value={jobData.degrees_or_streams}
                onChange={handleInputChange}
                placeholder="e.g., B.Tech, Computer Science"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Who Can Apply
              </label>
              <textarea
                name="who_can_apply"
                value={jobData.who_can_apply}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              ></textarea>
            </div>
          </FormSection>

          <FormSection title="Compensation & Logistics">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Salary/Stipend *
              </label>
              <input
                type="text"
                name="salary_or_stipend"
                value={jobData.salary_or_stipend}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                name="start_date"
                value={jobData.start_date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={jobData.duration}
                onChange={handleInputChange}
                required
                placeholder="e.g., 3 months"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Perks
              </label>
              <input
                type="text"
                name="perks"
                value={jobData.perks}
                onChange={handleInputChange}
                placeholder="e.g., Certificate, Flexible hours"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </FormSection>

          <FormSection title="Application Process">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Application Deadline *
              </label>
              <input
                type="date"
                name="application_deadline"
                value={jobData.application_deadline}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Openings *
              </label>
              <input
                type="number"
                name="openings"
                value={jobData.openings}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cover Letter Question
              </label>
              <input
                type="text"
                name="cover_letter_question"
                value={jobData.cover_letter_question}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Assessment Questions
              </label>
              <textarea
                name="assessment_questions"
                value={jobData.assessment_questions}
                onChange={handleInputChange}
                rows={3}
                placeholder="Separate questions with a semicolon (;)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              ></textarea>
            </div>
            <div className="flex items-center space-x-6 pt-2">
              <ToggleSwitch
                name="require_resume"
                label="Resume Required"
                checked={jobData.require_resume}
                onChange={handleInputChange}
              />
              <ToggleSwitch
                name="ppo_available"
                label="PPO Available"
                checked={jobData.ppo_available}
                onChange={handleInputChange}
              />
              <ToggleSwitch
                name="women_reentry"
                label="Women Re-entry"
                checked={jobData.women_reentry}
                onChange={handleInputChange}
              />
            </div>
          </FormSection>

          <FormSection title="Company Information">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                name="company_name"
                value={jobData.company_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                About Company
              </label>
              <textarea
                name="about_company"
                value={jobData.about_company}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Website
              </label>
              <input
                type="url"
                name="company_website"
                value={jobData.company_website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </FormSection>

          {/* Footer with Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 sticky bottom-0 bg-white py-4 px-6">
            <button
              type="button"
              onClick={navigateBack}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Post Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
