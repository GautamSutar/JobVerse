import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileCompletion = ({ onSubmit }) => {
  const token = localStorage.getItem("authToken");
  const email = localStorage.getItem("userEmail");
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

  useEffect(() => {
    const fetchProfile = async () => {
      if (!cacheKey || !token) return;

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
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/hr/hr-profiles/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const dataToStore = {
          data: res.data,
          timestamp: Date.now(),
          email: email,
        };

        localStorage.setItem(cacheKey, JSON.stringify(dataToStore));
        setFormData({ ...res.data, logo: null });
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
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (formData[key] !== null && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      }

      const res = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/hr/hr-profiles/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newDataToCache = {
        data: res.data,
        timestamp: Date.now(),
        email: email,
      };

      localStorage.setItem(cacheKey, JSON.stringify(newDataToCache));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
      });

      if (onSubmit) onSubmit(res.data);
    } catch (err) {
      console.error("Submission Error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
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
            value={formData.mobile_number || ""}
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
            value={formData.gender || ""}
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
            value={formData.linkedin_profile || ""}
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
            value={formData.company_name || ""}
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
            value={formData.company_email || ""}
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
            value={formData.company_location || ""}
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
            value={formData.designation || ""}
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
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileCompletion;
