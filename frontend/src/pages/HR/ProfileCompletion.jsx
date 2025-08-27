import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { FiLoader } from "react-icons/fi";

const ProfileCompletion = ({ onSubmit }) => {
  const token = useAuthStore.getState().accessToken;
  const email = useAuthStore.getState().email;
  const cacheKey = email ? `hrProfile_${email}` : null;

  const [formData, setFormData] = useState({
    mobile_number: "",
    gender: "",
    linkedin_profile: "",
    company_name: "",
    company_email: "",
    company_location: "",
    designation: "",
    logo: null,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // separate state for submit button loader

  useEffect(() => {
    const fetchProfile = async () => {
      if (!cacheKey || !token) return;

      // Clear old caches from other accounts
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("hrProfile_") && key !== cacheKey) {
          localStorage.removeItem(key);
        }
      });

      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const parsed = JSON.parse(cached);
        const isExpired = Date.now() - parsed.timestamp > 10 * 60 * 1000;

        if (!isExpired && parsed.email === email) {
          setFormData({ ...parsed.data, logo: null });
          setLoading(false);
          return;
        }
      }

      try {
        const res = await axiosInstance.get("hr/hr-profiles/");
        console.log("Fetched HR profile:", res.data);

        const profile = res.data;

        // 🔑 Map backend response → our form structure
        const mappedData = {
          mobile_number: profile.mobile_number || "",
          gender: profile.gender || "",
          linkedin_profile: profile.linkedin_profile || "",
          company_name: profile.company_name || profile.company?.name || "",
          company_email: profile.company_email || profile.company?.email || "",
          company_location:
            profile.company_location || profile.company?.location || "",
          designation: profile.designation || "",
          logo: null,
        };

        const dataToStore = {
          data: mappedData,
          timestamp: Date.now(),
          email: email,
        };

        localStorage.setItem(cacheKey, JSON.stringify(dataToStore));
        setFormData(mappedData);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [cacheKey, token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append only changed/non-empty fields
      for (let key in formData) {
        if (formData[key] !== null && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      }

      const res = await axiosInstance.patch("hr/hr-profiles/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Patch Data of HR:", res);

      const updatedData = { ...formData, ...res.data };

      const newDataToCache = {
        data: updatedData,
        timestamp: Date.now(),
        email: email,
      };

      localStorage.setItem(cacheKey, JSON.stringify(newDataToCache));
      setFormData({ ...updatedData, logo: null });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
      });

      if (onSubmit) onSubmit(updatedData);
    } catch (err) {
      console.error("Submission Error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Loader for profile fetching ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <FiLoader className="animate-spin text-5xl text-indigo-600" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-8 space-y-8 mt-8 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Complete Your Profile
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Mobile Number *
          </label>
          <input
            type="tel"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            LinkedIn Profile (optional)
          </label>
          <input
            type="url"
            name="linkedin_profile"
            value={formData.linkedin_profile}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Company Name *
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Company Email *
          </label>
          <input
            type="email"
            name="company_email"
            value={formData.company_email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Company Location *
          </label>
          <input
            type="text"
            name="company_location"
            value={formData.company_location}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Designation *
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Company Logo (optional)
          </label>
          <input
            type="file"
            name="logo"
            onChange={(e) =>
              setFormData({ ...formData, logo: e.target.files[0] })
            }
            accept=".png,.jpg,.jpeg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg transition shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting && <FiLoader className="animate-spin" />}
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileCompletion;
