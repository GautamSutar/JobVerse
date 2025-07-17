import React from "react";
import ScoresSection from "../../pages/Student/ScoresSection";
import JobsSection from "../../pages/Student/JobsSection";
import AppliedJobsSection from "../../pages/Student/AppliedJobsSection";
import ProfileSection from "../../pages/Student/ProfileSection";

export default function StudentDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 mt-32">
      <h1 className="text-2xl font-bold text-gray-800">Welcome, Student 👋</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <ScoresSection />
        <AppliedJobsSection />
        <ProfileSection />
      </div>

      <JobsSection />
    </div>
  );
}
