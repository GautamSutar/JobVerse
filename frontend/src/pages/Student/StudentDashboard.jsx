import React from "react";
// Import all the necessary icons
import {
  FiBriefcase,
  FiClipboard,
  FiUser,
  FiAward,
  FiBarChart2,
  FiTarget,
} from "react-icons/fi";

// Import all the dashboard components
import { SummaryCard } from "./SummaryCard";
import { SectionCard } from "./SectionCard";
import { MockInterviewChart } from "./MockInterviewCharts";
import { SkillRadarChart } from "./SkillReaderCharts";
import { AppliedJobsSection } from "./AppliedJobsSection";
import { ProfileSection } from "./ProfileSection";
import { ResumeUploadSection } from "./ResumeUploadSection";
import { ScoresSection } from "./ScoresSection";
import { DashboardNav } from "./DashboardNav";
import Notifications from "./Notifications";

// Placeholder for the JobsSection
const JobsSection = () => (
  <SectionCard title="Recommended For You" icon={FiBriefcase}>
    <div className="space-y-4">
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
        <div>
          <p className="font-semibold text-gray-800">
            Frontend Developer Intern
          </p>
          <p className="text-sm text-gray-500">Tech Solutions Inc.</p>
        </div>
        <button className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200">
          View
        </button>
      </div>
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
        <div>
          <p className="font-semibold text-gray-800">Product Design Intern</p>
          <p className="text-sm text-gray-500">Creative Minds Co.</p>
        </div>
        <button className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200">
          View
        </button>
      </div>
    </div>
  </SectionCard>
);

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, Student 👋
            </h1>
            <p className="mt-1 text-md text-gray-600">
              Here's a snapshot of your job application progress.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex flex-row space-x-4">
              <div className="mt-4 md:mt-0">
                <Notifications />
              </div>
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105">
                Explore New Jobs
              </button>
            </div>
          </div>
        </div>

        {/* --- NEW --- The navigation bar is placed here */}
        <DashboardNav />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            title="Jobs Applied"
            value="3"
            icon={FiClipboard}
            color="border-blue-500"
          />
          <SummaryCard
            title="ATS Score"
            value="78%"
            icon={FiAward}
            color="border-green-500"
          />
          <SummaryCard
            title="Mock Interview Score"
            value="85%"
            icon={FiBarChart2}
            color="border-yellow-500"
          />
          <SummaryCard
            title="Interview Emails"
            value="2"
            icon={FiBriefcase}
            color="border-red-500"
          />
        </div>

        {/* Main Dashboard Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-8">
            <ProfileSection />
            <ResumeUploadSection />
          </div>

          {/* Middle Column */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-8">
            <JobsSection />
            <AppliedJobsSection />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-8">
            <ScoresSection />
            <SkillRadarChart />
          </div>
        </div>

        {/* Full-width chart section */}
        <div className="mt-8">
          <MockInterviewChart />
        </div>
      </main>
    </div>
  );
}
