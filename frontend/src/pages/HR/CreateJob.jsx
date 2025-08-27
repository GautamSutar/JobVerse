import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import axiosInstance from "../../store/api/axiosInstance";
import { useAuthStore } from "../../store/authStore/authStore";

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
  FiEdit3,
  FiInfo,
  FiLink,
  FiList,
  FiTarget,
  FiClock,
  FiHash,
  FiType,
  FiHome,
} from "react-icons/fi";

// Custom Toggle Switch Component (Unchanged)
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

// New: Input with Icon Component for better UI
const InputWithIcon = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      {icon}
    </span>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-shadow"
    />
  </div>
);
const TextareaWithIcon = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute top-3 left-0 flex items-center pl-3">{icon}</span>
    <textarea
      {...props}
      className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-shadow"
    ></textarea>
  </div>
);

// Updated Form Section Component
const FormSection = ({ title, children }) => (
  <div className="border-t border-gray-200 pt-6">
    <h3 className="text-lg font-bold text-indigo-700 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
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
  const token = useAuthStore((state) => state.accessToken);

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
      const url = isEdit ? `job/update-job/${jobId}/` : `job/create/`;
      const method = isEdit ? "put" : "post";
      const response = await axiosInstance({
        method,
        url,
        data: jobData,
        headers: {
          "Content-Type": "application/json",
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
      onClose(); // Close the modal on success
    } catch (err) {
      console.log(err);
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
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-white text-black rounded-t-2xl sticky top-0 z-10">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Job Posting" : "Create New Job Posting"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-white hover:bg-indigo-500 transition-colors"
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
              <InputWithIcon
                icon={<FiBriefcase className="text-gray-400" />}
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category *
              </label>
              <InputWithIcon
                icon={<FiList className="text-gray-400" />}
                type="text"
                name="category"
                value={jobData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Job Type *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiHome className="text-gray-400" />
                </span>
                <select
                  name="job_type"
                  value={jobData.job_type}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-shadow"
                >
                  <option value="remote">Remote</option>
                  <option value="in_office">In Office</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description *
              </label>
              <TextareaWithIcon
                icon={<FiFileText className="text-gray-400" />}
                name="description"
                value={jobData.description}
                onChange={handleInputChange}
                required
                rows={4}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Responsibilities
              </label>
              <TextareaWithIcon
                icon={<FiTarget className="text-gray-400" />}
                name="responsibilities"
                value={jobData.responsibilities}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter each responsibility on a new line"
              />
            </div>
          </FormSection>

          <FormSection title="Requirements">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Skills Required *
              </label>
              <InputWithIcon
                icon={<FiCode className="text-gray-400" />}
                type="text"
                name="skills_required"
                value={jobData.skills_required}
                onChange={handleInputChange}
                required
                placeholder="e.g., Python, React, SQL"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Experience Level
              </label>
              <InputWithIcon
                icon={<FiAward className="text-gray-400" />}
                type="text"
                name="experience_level"
                value={jobData.experience_level}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Graduation Years
              </label>
              <InputWithIcon
                icon={<FiCalendar className="text-gray-400" />}
                type="text"
                name="graduation_years"
                value={jobData.graduation_years}
                onChange={handleInputChange}
                placeholder="e.g., 2024, 2025"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Degrees or Streams
              </label>
              <InputWithIcon
                icon={<FiFileText className="text-gray-400" />}
                type="text"
                name="degrees_or_streams"
                value={jobData.degrees_or_streams}
                onChange={handleInputChange}
                placeholder="e.g., B.Tech, Computer Science"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Who Can Apply
              </label>
              <TextareaWithIcon
                icon={<FiUsers className="text-gray-400" />}
                name="who_can_apply"
                value={jobData.who_can_apply}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </FormSection>

          <FormSection title="Compensation & Logistics">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Salary/Stipend *
              </label>
              <InputWithIcon
                icon={<FiDollarSign className="text-gray-400" />}
                type="text"
                name="salary_or_stipend"
                value={jobData.salary_or_stipend}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Location *
              </label>
              <InputWithIcon
                icon={<FiGlobe className="text-gray-400" />}
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Start Date *
              </label>
              <InputWithIcon
                icon={<FiCalendar className="text-gray-400" />}
                type="date"
                name="start_date"
                value={jobData.start_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Duration *
              </label>
              <InputWithIcon
                icon={<FiClock className="text-gray-400" />}
                type="text"
                name="duration"
                value={jobData.duration}
                onChange={handleInputChange}
                required
                placeholder="e.g., 3 months"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Perks
              </label>
              <InputWithIcon
                icon={<FiAward className="text-gray-400" />}
                type="text"
                name="perks"
                value={jobData.perks}
                onChange={handleInputChange}
                placeholder="e.g., Certificate, Flexible hours"
              />
            </div>
          </FormSection>

          <FormSection title="Application Process">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Application Deadline *
              </label>
              <InputWithIcon
                icon={<FiCalendar className="text-gray-400" />}
                type="date"
                name="application_deadline"
                value={jobData.application_deadline}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Openings *
              </label>
              <InputWithIcon
                icon={<FiHash className="text-gray-400" />}
                type="number"
                name="openings"
                value={jobData.openings}
                onChange={handleInputChange}
                required
                min="1"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cover Letter Question
              </label>
              <InputWithIcon
                icon={<FiEdit3 className="text-gray-400" />}
                type="text"
                name="cover_letter_question"
                value={jobData.cover_letter_question}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Assessment Questions
              </label>
              <TextareaWithIcon
                icon={<FiCheck className="text-gray-400" />}
                name="assessment_questions"
                value={jobData.assessment_questions}
                onChange={handleInputChange}
                rows={3}
                placeholder="Separate questions with a semicolon (;)"
              />
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
              <InputWithIcon
                icon={<FiType className="text-gray-400" />}
                type="text"
                name="company_name"
                value={jobData.company_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                About Company
              </label>
              <TextareaWithIcon
                icon={<FiInfo className="text-gray-400" />}
                name="about_company"
                value={jobData.about_company}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Website
              </label>
              <InputWithIcon
                icon={<FiLink className="text-gray-400" />}
                type="url"
                name="company_website"
                value={jobData.company_website}
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            </div>
          </FormSection>

          {/* Footer with Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 sticky bottom-0 bg-white py-4 px-6 z-10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-800 font-semibold hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center"
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
