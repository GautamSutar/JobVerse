import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FiX } from "react-icons/fi";

const CreateJob = ({ onSubmit, onClose, jobId, initialData, isEdit }) => {
  const [jobData, setJobData] = useState(
    initialData || {
      title: "",
      domain: "",
      skills_required: "",
      description: "",
      start_date: "",
      end_date: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  const navigateBack = () => {
    if (onClose) {
      onClose(); // close modal
    } else {
      window.location.href = "/hr-dashboard"; 
    }
  };

  useEffect(() => {
    if (isEdit && jobId) {
      setLoading(true);
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/job/list-job/${jobId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => setJobData(res.data))
        .catch(() => Swal.fire("Error", "Failed to load job details.", "error"))
        .finally(() => setLoading(false));
    }
  }, [isEdit, jobId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "hr") {
      return Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Only HR users can post jobs.",
      });
    }

    if (!token) {
      return Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "You must be logged in to post a job.",
      });
    }

    try {
      const url = isEdit
        ? `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/job/update-job/${jobId}/`
        : `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/job/create/`;

      const method = isEdit ? "PUT" : "POST";

      const response = await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: jobData,
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: isEdit ? "Job updated successfully!" : "Job posted successfully!",
        confirmButtonColor: "#16a34a",
      });

      onSubmit(response.data);
      navigateBack();
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Something went wrong.",
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          Loading job details...
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          navigateBack();
        }
      }}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl relative transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={navigateBack}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          {isEdit ? "Edit Job" : "Create New Job"}
        </h2>

        {error && (
          <div className="text-red-600 mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Domain *
            </label>
            <input
              type="text"
              name="domain"
              value={jobData.domain}
              onChange={handleInputChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Skills Required
            </label>
            <input
              type="text"
              name="skills_required"
              value={jobData.skills_required}
              onChange={handleInputChange}
              placeholder="Comma-separated skills"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date *
            </label>
            <input
              type="date"
              name="start_date"
              value={jobData.start_date}
              onChange={handleInputChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date *
            </label>
            <input
              type="date"
              name="end_date"
              value={jobData.end_date}
              onChange={handleInputChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={navigateBack}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            >
              {isEdit ? "Update Job" : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
