import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ApplicantDossier from "./ApplicantDossier";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import axiosInstance from "../../store/api/axiosInstance";

import {
  FiArrowLeft,
  FiLoader,
  FiAlertTriangle,
  FiUsers,
  FiRefreshCw,
} from "react-icons/fi";

const ApplicantsDetailPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const token = localStorage.getItem("authToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchApplicants = useCallback(
    async (forceRefresh = false) => {
      setLoading(true);
      const cacheKey = `applicants_for_job_${jobId}`;

      if (!forceRefresh) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setApplicants(parsedData);
          if (parsedData.length > 0) setJobTitle(parsedData[0].job.title);
          setLoading(false);
          return;
        }
      }

      try {
        // const response = await axios.get(
        //   `${
        //     import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        //   }/job/${jobId}/applicants/`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const response = await axiosInstance.get(`job/${jobId}/applicants/`);
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("applicants_for_job_")) {
            localStorage.removeItem(key);
          }
        });
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
        setApplicants(response.data);
        if (response.data.length > 0) {
          setJobTitle(response.data[0].job.title);
        }
      } catch (err) {
        setError("Could not load applicant data.");
      } finally {
        setLoading(false);
      }
    },
    [jobId, token]
  );

  useEffect(() => {
    fetchApplicants(false);
  }, [fetchApplicants]);

  const handleRefresh = () => {
    fetchApplicants(true);
  };

  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedApplicant(null);
    setIsModalOpen(false);
  };

  const handleInterviewScheduled = (applicationId) => {
    const updatedApplicants = applicants.map((app) =>
      app.id === applicationId ? { ...app, is_scheduled: true } : app
    );
    setApplicants(updatedApplicants);
    const cacheKey = `applicants_for_job_${jobId}`;
    localStorage.setItem(cacheKey, JSON.stringify(updatedApplicants));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <FiLoader className="animate-spin text-5xl text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <FiAlertTriangle className="text-5xl text-red-500 mb-4" />
        <p className="text-xl font-semibold text-red-600">{error}</p>
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Return to Jobs List
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-indigo-100" />
        <div className="relative max-w-5xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-indigo-700 font-bold mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-2" />
            Back to All Jobs
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Applicants for:{" "}
                <span className="text-indigo-600">{jobTitle}</span>
              </h1>
              <p className="mt-4 flex items-center text-lg text-gray-600">
                <FiUsers className="mr-2" />
                {applicants.length} candidate(s) found for this position.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw
                className={`mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh List
            </button>
          </div>
        </div>
      </div>

      {/* --- THIS IS THE CORRECTED JSX BLOCK --- */}
      <div className="relative max-w-5xl mx-auto px-4 pb-16 -mt-8">
        {applicants.length > 0 ? (
          <div className="space-y-10">
            {applicants.map((applicant) => (
              <ApplicantDossier
                key={applicant.id}
                applicant={applicant}
                onScheduleClick={() => handleOpenModal(applicant)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-16 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              No Applicants Found
            </h2>
            <p className="mt-2 text-gray-500">
              There are currently no candidates for this job opening.
            </p>
          </div>
        )}
      </div>
      {/* --- END OF CORRECTED BLOCK --- */}

      {isModalOpen && selectedApplicant && (
        <ScheduleInterviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          applicant={selectedApplicant}
          onInterviewScheduled={handleInterviewScheduled}
        />
      )}
    </div>
  );
};

export default ApplicantsDetailPage;
