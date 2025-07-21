import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileCompletion = ({ onSubmit }) => {
  const token = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    mobile_number: "",
    gender: "",
    linkedin_profile: "",
    company_name: "",
    company_email: "",
    company_location: "",
    designation: "",
    logo: null, // Optional: only if your model/serializer accepts it
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/hr/hr-profiles/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData({
          ...res.data,
          logo: null, // keep logo field empty on load
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

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

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
      });
      if (onSubmit) onSubmit(res.data);
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* HR Profile Fields */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Mobile Number *
          </label>
          <input
            type="tel"
            name="mobile_number"
            value={formData.mobile_number || ""}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 text-sm w-full"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            LinkedIn Profile (optional)
          </label>
          <input
            type="url"
            name="linkedin_profile"
            value={formData.linkedin_profile || ""}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Company Name *
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name || ""}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Company Email *
          </label>
          <input
            type="email"
            name="company_email"
            value={formData.company_email || ""}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Company Location *
          </label>
          <input
            type="text"
            name="company_location"
            value={formData.company_location || ""}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Designation *
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation || ""}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Company Logo (Optional)
          </label>
          <input
            type="file"
            name="logo"
            onChange={(e) =>
              setFormData({ ...formData, logo: e.target.files[0] })
            }
            accept=".png,.jpg,.jpeg"
            className="border rounded px-3 py-2 text-sm w-full"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileCompletion;
