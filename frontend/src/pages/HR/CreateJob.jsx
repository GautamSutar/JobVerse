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

  // Fetch job details when editing
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
      onClose();
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
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          Loading job details...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isEdit ? "Edit Job" : "Create New Job"}
        </h2>
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
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
              rows={5}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
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
