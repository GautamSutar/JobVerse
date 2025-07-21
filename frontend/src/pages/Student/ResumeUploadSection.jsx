import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function ResumeUploadSection() {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);

    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setResumePreviewUrl(fileUrl);
    } else {
      setResumePreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setUploading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/student/student-profiles/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Resume upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 w-full h-full flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-3">Upload Resume</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
      />

      {resumePreviewUrl && (
        <iframe
          src={resumePreviewUrl}
          title="Resume Preview"
          className="w-full h-64 mt-4 border"
        ></iframe>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleUpload}
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full shadow-md transition-all duration-200 ease-in-out"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </motion.button>
    </div>
  );
}
