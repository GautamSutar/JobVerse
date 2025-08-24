import React, { use, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiX, FiClock, FiLoader } from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
const ScheduleInterviewModal = ({
  isOpen,
  onClose,
  applicant,
  onInterviewScheduled,
}) => {
  const [scheduledTime, setScheduledTime] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore.getState().accessToken;

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scheduledTime) {
      Swal.fire(
        "Validation Error",
        "Please select a date and time for the interview.",
        "warning"
      );
      return;
    }

    setLoading(true);
    const payload = {
      job_applications: applicant.id,
      scheduled_time: new Date(scheduledTime).toISOString(),
    };
    // This log will now show you the correct, complete payload before it's sent.
    console.log("SENDING CORRECTED PAYLOAD:", payload);
    try {
      const response = await axiosInstance.post(
        "interview/schedule-interview/",
        payload
      );
      // const response = await axios.post(
      //   `${
      //     import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      //   }/interview/schedule-interview/`,
      //   payload,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      Swal.fire({
        icon: "success",
        title: "Interview Scheduled!",
        text:
          response.data.message || "The candidate has been notified via email.",
        timer: 3000,
        showConfirmButton: false,
      });

      onInterviewScheduled(applicant.id);
      onClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to schedule the interview.";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const applicantName =
    applicant.student?.student_profile?.user?.first_name +
    " " +
    applicant.student?.student_profile?.user?.last_name;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Schedule Interview
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">Scheduling an interview for:</p>
            <p className="font-bold text-lg text-indigo-600">{applicantName}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="scheduledTime"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Select Interview Date & Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiClock className="text-gray-400" />
              </div>
              <input
                id="scheduledTime"
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center"
            >
              {loading ? <FiLoader className="animate-spin mr-2" /> : null}
              {loading ? "Scheduling..." : "Confirm & Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
