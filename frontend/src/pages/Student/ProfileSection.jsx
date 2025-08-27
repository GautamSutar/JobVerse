import React, { useEffect, useState, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import { FiUser, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { SectionCard } from "./SectionCard"; // For consistent UI
import { useAuthStore } from "../../store/authStore/authStore";
import axiosInstance from "../../store/api/axiosInstance";

// const API_BASE =
//   import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://127.0.0.1:8000/api";

export const ProfileSection = () => {
  const [profileData, setProfileData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore.getState().accessToken;
  const email = useAuthStore.getState().email;
  const cacheKey = email ? `studentProfile_${email}` : null;
  const sections = {
    "Personal Information": {
      first_name: "First Name",
      last_name: "Last Name",
      gender: "Gender",
      date_of_birth: "Date of Birth",
      mobile_number: "Mobile Number",
      address: "Address",
    },
    "Social Links": {
      linkedin_profile: "LinkedIn Profile",
      github_profile: "GitHub Profile",
    },
    Education: {
      college_name: "College Name",
      degree: "Degree",
      branch: "Branch",
      specialization: "Specialization",
      graduation_year: "Graduation Year",
      cgpa: "CGPA",
    },
    "Upload Documents": {
      resume: "Resume (PDF)",
      cover_letter: "Cover Letter (PDF)",
    },
  };

  const fetchProfile = useCallback(async () => {
    if (!cacheKey || !token) {
      setLoading(false);
      return;
    }
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("studentProfile_") && key !== cacheKey) {
        localStorage.removeItem(key);
      }
    });
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      const isExpired = Date.now() - parsed.timestamp > 10 * 60 * 1000;
      if (!isExpired && parsed.email === email) {
        setProfileData(parsed.data);
        setLoading(false);
        return;
      }
    }
    setLoading(true);
    try {
      const res = await axiosInstance.get("student/student-profiles/");
      // const res = await axios.get(`${API_BASE}/student/student-profiles/`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      let profile = {};
      if (Array.isArray(res.data) && res.data.length > 0) {
        profile = res.data[0];
      } else if (
        typeof res.data === "object" &&
        res.data !== null &&
        !Array.isArray(res.data)
      ) {
        profile = res.data;
      }
      const user = profile.user || {};
      const enrichedData = { ...profile, ...user };
      setProfileData(enrichedData);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: enrichedData, timestamp: Date.now(), email })
      );
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, token, email]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setProfileData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in profileData) {
      if (Object.prototype.hasOwnProperty.call(profileData, key)) {
        const value = profileData[key];
        if (
          key === "user" ||
          key === "id" ||
          key === "email" ||
          key === "username" ||
          value === null ||
          value === undefined
        ) {
          continue;
        }
        if (key === "resume" || key === "cover_letter") {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      }
    }

    try {
      const response = await axiosInstance.patch(
        "student/student-profiles/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const response = await axios.patch(
      //   `${API_BASE}/student/student-profiles/`,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      Swal.fire("Success", "Profile updated successfully!", "success");
      const responseData = response.data;
      const updatedProfile = { ...profileData };
      if (responseData.resume) {
        updatedProfile.resume = responseData.resume;
      }
      if (responseData.cover_letter) {
        updatedProfile.cover_letter = responseData.cover_letter;
      }
      setProfileData(updatedProfile);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: updatedProfile, timestamp: Date.now(), email })
      );
      setIsOpen(false);
    } catch (error) {
      const apiError = error.response?.data;
      console.error("Update failed:", apiError || error);
      const errorMessage =
        typeof apiError === "object"
          ? JSON.stringify(apiError)
          : "Failed to update profile. Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };
  if (loading) {
    return (
      <SectionCard title="Your Profile" icon={FiUser}>
        <div className="min-h-[150px] flex items-center justify-center">
          <p className="text-gray-500 animate-pulse">Loading Profile...</p>
        </div>
      </SectionCard>
    );
  }
  return (
    <>
      <SectionCard title="Your Profile" icon={FiUser}>
        <div className="text-gray-700 space-y-3">
          <p className="text-sm">
            <strong>Name:</strong> {profileData.first_name || "N/A"}{" "}
            {profileData.last_name || ""}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {profileData.email || "N/A"}
          </p>
          <p className="text-sm">
            <strong>College:</strong> {profileData.college_name || "Not set"}
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          View & Edit Profile
        </button>
      </SectionCard>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="max-h-[85vh] overflow-y-auto pr-2"
            >
              <div className="flex justify-between items-center border-b pb-3 mb-5">
                <Dialog.Title className="text-xl font-bold text-gray-800">
                  Update Your Profile
                </Dialog.Title>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-red-600 p-1 rounded-full"
                >
                  <FiX size={24} />
                </button>
              </div>
              {Object.entries(sections).map(([sectionTitle, fields]) => (
                <div key={sectionTitle} className="mb-6">
                  <h4 className="text-lg font-semibold text-indigo-700 mb-4">
                    {sectionTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(fields).map(([field, label]) => (
                      <div key={field} className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                          {label}
                        </label>
                        {["resume", "cover_letter"].includes(field) ? (
                          <>
                            <input
                              type="file"
                              name={field}
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                            />
                            {profileData[field] &&
                              typeof profileData[field] === "string" && (
                                <a
                                  href={profileData[field]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline mt-1"
                                >
                                  View Current {label}
                                </a>
                              )}
                          </>
                        ) : (
                          <input
                            name={field}
                            type={field.includes("date") ? "date" : "text"}
                            value={profileData[field] || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            readOnly={["email", "username"].includes(field)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4 mt-6 border-t">
                <button
                  type="submit"
                  className="bg-green-600 cursor-pointer text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
