// src/components/SkillCheckHomepage/SkillCheckHomepage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import CTASection from "./CTASection";

const SkillCheckHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleResumeUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/resume/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Resume uploaded successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Resume uploaded successfully!",
          confirmButtonColor: "#3085d6",
        });
        navigate("/practice");
      } catch (error) {
        console.error("Resume upload failed:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to upload resume. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection
        handleResumeUpload={handleResumeUpload}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection
        handleResumeUpload={handleResumeUpload}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default SkillCheckHomepage;
