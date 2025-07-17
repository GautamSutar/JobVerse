import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL ||
  "http://127.0.0.1:8000/api/student/student-profiles/";

const modelFields = {
  "Full Name": "full_name",
  Email: "email",
  Phone: "mobile_number",
  "Date of Birth": "date_of_birth",
  Gender: "gender",
  Address: "address",
  "LinkedIn Profile": "linkedin_profile",
  "GitHub Profile": "github_profile",
  "Languages Known": "languages_known",

  "College Name": "college_name",
  Degree: "degree",
  Branch: "branch",
  Specialization: "specialization",
  "Graduation Year": "graduation_year",
  CGPA: "cgpa",
  "School Name": "school_name",
  "12th Marks": "marks_12",
  "10th Marks": "marks_10",

  Resume: "resume",
  "Cover Letter": "cover_letter",
  "ATS Score": "ats_score",
  "Aptitude Score": "aptitude_score",
  "AI Score": "ai_score",
  "Interview Feedback": "Interview_Feedback",
  "Interview Taken": "interview_taken",

  "Certificate Name": "certificate_name",
  "Certificate URL": "credential_url",
  "Transcript File": "transcript_file",

  "Internship Job Title": "job_title",
  "Internship Company Name": "company_name",
  "Internship Start Date": "start_date",
  "Internship End Date": "end_date",
  "Internship Description": "description",
  "Internship Stipened": "stipened",
  "Internship Experience": "experience",

  "Project Title": "project_title",
  "Project Description": "project_description",
  "Technologies Used": "technologies_used",
  "Project Role": "project_role",
  "GitHub Link": "github_link",
  "Live Link": "live_link",

  "Technical Skills": "technical_skills",
  "Soft Skills": "soft_skills",
  "Preferred Roles": "preferred_roles",
  "Job Type": "job_type",
  "Preferred Location": "preferred_location",

  "Achievement Title": "achievement_title",
  "Achievement Description": "achievement_description",
  "Achievement Type": "achievement_type",
};

export default function ProfileSection() {
  const [profileData, setProfileData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const profileFields = Object.keys(modelFields);

  const filledCount = profileFields.filter(
    (field) => profileData[modelFields[field]]
  ).length;
  const completion = Math.round((filledCount / profileFields.length) * 100);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/student/student-profiles/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          setProfileData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [modelFields[name]]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/student/student-profiles/`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsOpen(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="mt-8 bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Profile Completion</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Edit Profile
        </button>
      </div>
      <div className="mt-4 w-full bg-gray-200 h-4 rounded">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${completion}%` }}
        />
      </div>
      <p className="mt-2 text-gray-600">{completion}% completed</p>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4"
          >
            <h3 className="text-xl font-bold mb-2">Update Profile</h3>
            {profileFields.map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1">
                  {field}
                </label>
                <input
                  name={field}
                  type="text"
                  value={profileData[modelFields[field]] || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Profile
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
