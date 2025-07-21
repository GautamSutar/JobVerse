import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const API_BASE =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://127.0.0.1:8000/api";

export default function ProfileSection() {
  const [profileData, setProfileData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("authToken");

  const sections = {
    "Personal Information": {
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
      school_name: "School Name",
      marks_12: "12th Marks",
      marks_10: "10th Marks",
      cgpa: "CGPA",
      languages_known: "Languages Known",
    },
    "Scores & Feedback": {
      ats_score: "ATS Score",
      aptitude_score: "Aptitude Score",
      ai_score: "AI Score",
      interview_Feedback: "Interview Feedback",
      interview_taken: "Interview Taken",
    },
    "Upload Documents": {
      resume: "Resume (PDF)",
      cover_letter: "Cover Letter (PDF)",
    },
  };

  useEffect(() => {
    axios
      .get(`${API_BASE}/student/student-profiles/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        const user = data.user || {};

        const enrichedData = {
          ...data,
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          username: user.username || "",
          email: user.email || "",
        };

        setProfileData(enrichedData);
      })
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setProfileData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const userFields = ["first_name", "last_name"];
      const userData = {};

      userFields.forEach((key) => {
        if (profileData[key]) {
          userData[key] = profileData[key];
        }
      });

      formData.append("user", JSON.stringify(userData));

      const editableFields = Object.values(sections)
        .flatMap((group) => Object.keys(group))
        .filter((key) => !["email", "username"].includes(key));

      editableFields.forEach((key) => {
        const value = profileData[key];
        if (value !== null && value !== undefined && value !== "") {
          // Only append file if it's a File object
          if (
            ["resume", "cover_letter"].includes(key) &&
            typeof value !== "string"
          ) {
            formData.append(key, value);
          }
          if (!["resume", "cover_letter"].includes(key)) {
            formData.append(key, value);
          }
        }
      });

      await axios.patch(`${API_BASE}/student/student-profiles/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#22c55e",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating your profile. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="mt-8 bg-white p-6 shadow-md rounded-lg border">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Profile Completion</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      </div>

      <div className="mt-4 text-gray-700 space-y-2">
        <p>
          <strong>👤 Name:</strong> {profileData.first_name}{" "}
          {profileData.last_name}
        </p>
        <p>
          <strong>📧 Email:</strong> {profileData.email}
        </p>
        <p>
          <strong>🔐 Username:</strong> {profileData.username}
        </p>
        <p>
          <strong>🎓 College:</strong> {profileData.college_name}
        </p>
        <p>
          <strong>📚 Branch:</strong> {profileData.branch}
        </p>
        <p>
          <strong>📆 Graduation Year:</strong> {profileData.graduation_year}
        </p>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto space-y-6 relative"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
            >
              <FiX size={24} />
            </button>

            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
              Update Your Profile
            </h3>

            {Object.entries(sections).map(([sectionTitle, fields]) => (
              <div key={sectionTitle}>
                <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                  {sectionTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(fields).map(([field, label]) => (
                    <div key={field} className="flex flex-col">
                      <label className="text-sm font-semibold mb-1 text-gray-700">
                        {label}
                      </label>
                      {["resume", "cover_letter"].includes(field) ? (
                        <>
                          <input
                            type="file"
                            name={field}
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="border rounded px-3 py-2 text-sm"
                          />
                          {profileData[field] &&
                            typeof profileData[field] === "string" && (
                              <a
                                href={profileData[field]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 underline mt-1"
                              >
                                View Existing {label}
                              </a>
                            )}
                        </>
                      ) : (
                        <input
                          name={field}
                          type={field.includes("date") ? "date" : "text"}
                          value={profileData[field] || ""}
                          onChange={handleChange}
                          className="border rounded px-3 py-2 text-sm"
                          readOnly={["email", "username"].includes(field)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
