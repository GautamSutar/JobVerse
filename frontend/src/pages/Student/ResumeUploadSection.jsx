import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { SectionCard } from "./SectionCard"; // For consistent UI
import { FiUploadCloud } from "react-icons/fi";

// Using a NAMED export for consistency
export const ResumeUploadSection = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setFileName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) {
      Swal.fire("No File", "Please select a resume file first.", "warning");
      return;
    }

    const formData = new FormData();
    // The backend might expect a specific key, like 'resume_file' or 'resume'.
    // Adjust this key if your backend requires it.
    formData.append("resume", resumeFile);

    setUploading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        "http://127.0.0.1:8000/api/student/student-profiles/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire(
        "Success!",
        "Your resume has been uploaded successfully.",
        "success"
      );
      setFileName(""); // Clear the file name after successful upload
      setResumeFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire(
        "Upload Failed",
        "There was an error uploading your resume.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <SectionCard title="Manage Your Resume" icon={FiUploadCloud}>
      <div style={{ width: "100%", height: 237 }} className="space-y-4">
        <p className="text-sm text-gray-600">
          Ensure your resume is always up-to-date to improve your application
          success.
        </p>

        {/* Custom File Input Button */}
        <div className="relative">
          <label
            htmlFor="resume-upload-input"
            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors"
          >
            <FiUploadCloud className="mr-2" />
            <span>{fileName || "Choose a PDF file"}</span>
          </label>
          <input
            id="resume-upload-input"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 shadow-sm transition-all duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={uploading || !resumeFile}
        >
          {uploading ? "Uploading..." : "Upload & Save"}
        </button>
      </div>
    </SectionCard>
  );
};
