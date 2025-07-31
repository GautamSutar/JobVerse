import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import Chart from "chart.js/auto";
import CreateJob from "./CreateJob";
import ProfileCompletion from "./ProfileCompletion";
import {
  FiPlus,
  FiUsers,
  FiFileText,
  FiUserCheck,
  FiEdit,
  FiEye,
  FiTrendingUp,
  FiCheckCircle,
  FiDollarSign,
  FiClock,
  FiCalendar,
  FiBriefcase,
  FiX,
} from "react-icons/fi";

// --- Main Dashboard Component ---
export default function HRDashboard() {
  // --- ALL YOUR EXISTING LOGIC IS PRESERVED ---
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
              label: "Applications",
              data: [200, 300, 400, 250, 150],
              backgroundColor: "rgba(99, 102, 241, 0.6)",
              borderColor: "rgba(99, 102, 241, 1)",
              borderWidth: 1,
              borderRadius: 5,
            },
          ],
        },
        options: { scales: { y: { beginAtZero: true } } },
      });
      incomeChartInstance = new Chart(ctxIncome, {
        type: "doughnut",
        data: {
          labels: ["Hired", "Pending"],
          datasets: [
            {
              data: [71, 50],
              backgroundColor: [
                "rgba(52, 211, 153, 0.7)",
                "rgba(251, 191, 36, 0.7)",
              ],
              borderColor: ["#ffffff"],
              borderWidth: 2,
            },
          ],
        },
        options: { responsive: true, cutout: "70%" },
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

  // --- NEW, ENHANCED UI ---
  return (
    <div className="min-h-screen mt-24 bg-slate-50">
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader
            onOpenCreateJob={() => setIsCreateJobModalOpen(true)}
          />

          <QuickActions
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard
              icon={FiUsers}
              title="New Applications"
              value={metrics.newApplications}
              trend="+14%"
              trendColor="green"
            />
            <MetricCard
              icon={FiCheckCircle}
              title="Total Hires"
              value={metrics.totalHires}
              trend="-7%"
              trendColor="red"
            />
            <MetricCard
              icon={FiDollarSign}
              title="Total Income"
              value={metrics.totalIncome}
              trend="+8%"
              trendColor="green"
            />
            <MetricCard
              icon={FiClock}
              title="Pending Applications"
              value={metrics.pendingApplications}
              trend="+5%"
              trendColor="yellow"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Application Traffic
              </h3>
              <canvas id="trafficChart" height="150"></canvas>
            </div>
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Hiring Funnel
              </h3>
              <canvas id="incomeChart" height="150"></canvas>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard
              icon={FiCalendar}
              title="Interviews Scheduled"
              value={metrics.interviewsScheduled}
              trend="+10%"
              trendColor="green"
            />
            <MetricCard
              icon={FiBriefcase}
              title="Active Job Openings"
              value={metrics.jobOpenings}
              trend="+2%"
              trendColor="blue"
            />
          </div>

          <RecentActivities />
        </div>
      </main>

      {/* --- MODALS (Your logic preserved, UI slightly refined) --- */}
      <Dialog
        open={isCreateJobModalOpen}
        onClose={() => setIsCreateJobModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl">
            <div className="flex justify-between items-center border-b pb-3 mb-5">
              <Dialog.Title className="text-xl font-bold text-gray-800">
                Create New Job Post
              </Dialog.Title>
              <button
                onClick={() => setIsCreateJobModalOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto pr-2">
              <CreateJob onSubmit={handleCreateJobSubmit} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl">
            <div className="flex justify-between items-center border-b pb-3 mb-5">
              <Dialog.Title className="text-xl font-bold text-gray-800">
                Update HR Profile
              </Dialog.Title>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto pr-2">
              <ProfileCompletion onSubmit={handleProfileSubmit} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

// --- NEW, ENHANCED SUB-COMPONENTS ---

const DashboardHeader = ({ onOpenCreateJob }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
      <p className="mt-1 text-md text-gray-600">
        Welcome! Here's an overview of your hiring activities.
      </p>
    </div>
    <button
      onClick={onOpenCreateJob}
      className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105"
    >
      <FiPlus /> Create New Job
    </button>
  </div>
);

const QuickActions = ({ onOpenProfileModal }) => {
  const actions = [
    { icon: FiUsers, title: "View Candidates", path: "/job-list-page" },
    { icon: FiFileText, title: "Generate Report", path: "/generate-report" },
    { icon: FiEye, title: "See All Jobs", path: "/see-job" },
    { icon: FiEdit, title: "Update Profile", action: onOpenProfileModal },
  ];
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => {
          const content = (
            <>
              <action.icon className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="font-semibold text-gray-700 text-sm">
                {action.title}
              </span>
            </>
          );
          if (action.path) {
            return (
              <Link
                key={action.title}
                to={action.path}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {content}
              </Link>
            );
          }
          return (
            <button
              key={action.title}
              onClick={action.action}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, title, value, trend, trendColor }) => {
  const colorClasses = {
    green: { bg: "bg-green-100", text: "text-green-600" },
    red: { bg: "bg-red-100", text: "text-red-600" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
  }[trendColor];

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg flex items-start gap-4">
      <div className={`p-3 rounded-full ${colorClasses.bg}`}>
        <Icon className={`h-6 w-6 ${colorClasses.text}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center text-sm">
          <FiTrendingUp className={`mr-1 ${colorClasses.text}`} />
          <span className={colorClasses.text}>{trend}</span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
    </div>
  );
};

const RecentActivities = () => {
  const activities = [
    {
      icon: FiUsers,
      text: "New application from John Doe for Senior Developer",
      time: "12:30 PM",
    },
    {
      icon: FiBriefcase,
      text: "Job posted: Senior Developer",
      time: "10:00 AM",
    },
    {
      icon: FiCalendar,
      text: "Interview scheduled for Jane Smith",
      time: "Yesterday",
    },
  ];
  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activities
      </h3>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center gap-4">
            <div className="p-2 bg-slate-100 rounded-full">
              <activity.icon className="h-5 w-5 text-slate-600" />
            </div>
            <p className="text-sm text-gray-700 flex-grow">{activity.text}</p>
            <p className="text-sm text-gray-500 flex-shrink-0">
              {activity.time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
