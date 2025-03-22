// src/components/SkillCheckHomepage/TestimonialsSection.jsx
import React from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600">
            See how skillCheck has helped job seekers land their dream roles
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="After uploading my resume and practicing with skillCheck for just two weeks, I felt so much more confident. The AI feedback pointed out filler words I didn't realize I was using. I got the job at the tech company I was aiming for!"
            name="Jessica D."
            title="Software Engineer"
            initials="JD"
          />
          <TestimonialCard
            quote="The resume analysis feature gave me incredibly realistic technical questions. Being able to practice explaining complex concepts clearly helped me tremendously. The questions were almost identical to what I was asked in my actual interview."
            name="Michael R."
            title="Data Scientist"
            initials="MR"
          />
          <TestimonialCard
            quote="As someone transitioning careers, I was nervous about behavioral questions. skillCheck analyzed my resume and helped me craft compelling stories about my transferable skills. The feedback on my delivery was invaluable!"
            name="Aisha K."
            title="Marketing Manager"
            initials="AK"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
