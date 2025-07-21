// unchanged imports
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Chart from "chart.js/auto";
import CreateJob from "./CreateJob";
import ProfileCompletion from "./ProfileCompletion";

const HRDashboard = () => {
  const trafficChartRef = useRef(null);
  const incomeChartRef = useRef(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    let trafficChartInstance = null;
    let incomeChartInstance = null;

    try {
      const ctxTraffic = document
        .getElementById("trafficChart")
        .getContext("2d");
      const ctxIncome = document.getElementById("incomeChart").getContext("2d");

      if (trafficChartRef.current) trafficChartRef.current.destroy();
      if (incomeChartRef.current) incomeChartRef.current.destroy();

      trafficChartInstance = new Chart(ctxTraffic, {
        type: "bar",
        data: {
          labels: ["Jun 20", "Jun 27", "Jul 04", "Jul 11", "Jul 18"],
          datasets: [
            {
              label: "Traffic Sources",
              data: [200, 300, 400, 250, 150],
              backgroundColor: "rgba(59, 130, 246, 0.6)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: { y: { beginAtZero: true } },
        },
      });

      incomeChartInstance = new Chart(ctxIncome, {
        type: "doughnut",
        data: {
          labels: ["Achieved", "Remaining"],
          datasets: [
            {
              data: [75, 25],
              backgroundColor: [
                "rgba(34, 197, 94, 0.6)",
                "rgba(209, 213, 219, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true },
      });

      trafficChartRef.current = trafficChartInstance;
      incomeChartRef.current = incomeChartInstance;
    } catch (error) {
      console.error("Chart.js initialization failed:", error);
    }

    return () => {
      if (trafficChartRef.current) trafficChartRef.current.destroy();
      if (incomeChartRef.current) incomeChartRef.current.destroy();
    };
  }, []);

  const metrics = {
    newApplications: 234,
    totalHires: 71,
    totalIncome: "$1.45M",
    pendingApplications: 50,
    interviewsScheduled: 15,
    jobOpenings: 5,
  };

  const handleCreateJobSubmit = (jobData) => {
    console.log("Job Data Submitted:", jobData);
    setIsCreateJobModalOpen(false);
  };

  const handleProfileSubmit = (formData) => {
    console.log("Profile Data Submitted:", formData);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">HR Dashboard</h2>
            <button
              onClick={() => setIsCreateJobModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Create New Job
            </button>
          </div>

          <p className="text-gray-700 mb-6">
            This dashboard provides an overview of job postings, candidate
            applications, and performance metrics.
          </p>

          {/* Quick Actions at the top */}
          <div className="bg-blue-50 p-6 rounded-lg border shadow-md mb-6">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Quick Actions
            </h3>
            <Link
              to="/view-candidates"
              className="block text-indigo-600 hover:underline mb-2"
            >
              View Candidates
            </Link>
            <Link
              to="/generate-report"
              className="block text-indigo-600 hover:underline mb-2"
            >
              Generate Report
            </Link>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="block text-indigo-600 hover:underline mb-2"
            >
              Update Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <MetricCard
              title="New Applications"
              value={metrics.newApplications}
              color="green"
              trend="+14%"
            />
            <MetricCard
              title="Total Hires"
              value={metrics.totalHires}
              color="red"
              trend="-7%"
            />
            <MetricCard
              title="Total Income"
              value={metrics.totalIncome}
              color="green"
              trend="+8%"
            />
            <MetricCard
              title="Pending Applications"
              value={metrics.pendingApplications}
              color="orange"
              trend="+5%"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ChartCard title="Traffic Sources" canvasId="trafficChart" />
            <ChartCard title="Income" canvasId="incomeChart" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <MetricCard
              title="Interviews Scheduled"
              value={metrics.interviewsScheduled}
              color="green"
              trend="+10%"
            />
            <MetricCard
              title="Job Openings"
              value={metrics.jobOpenings}
              color="purple"
              trend="+2%"
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700">
              Recent Activities
            </h3>
            <ul className="text-gray-700 list-disc pl-5">
              <li>New application from John Doe - 12:30 PM, Jul 15, 2025</li>
              <li>Job posted: Senior Developer - 10:00 AM, Jul 15, 2025</li>
              <li>
                Interview scheduled for Jane Smith - 9:00 AM, Jul 16, 2025
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Dialog
        open={isCreateJobModalOpen}
        onClose={() => setIsCreateJobModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsCreateJobModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
              Create New Job Post
            </h3>
            <CreateJob onSubmit={handleCreateJobSubmit} />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
              Update HR Profile
            </h3>
            <ProfileCompletion onSubmit={handleProfileSubmit} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const MetricCard = ({ title, value, color, trend }) => (
  <div className={`bg-${color}-50 p-4 rounded-lg`}>
    <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    <span className={`text-${color}-600`}>{trend}</span>
  </div>
);

const ChartCard = ({ title, canvasId }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
    <canvas id={canvasId} width="400" height="200"></canvas>
  </div>
);

export default HRDashboard;
