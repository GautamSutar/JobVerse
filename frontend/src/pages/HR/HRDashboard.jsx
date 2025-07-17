import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Chart from "chart.js/auto";

const HRDashboard = () => {
  const trafficChartRef = useRef(null);
  const incomeChartRef = useRef(null);

  useEffect(() => {
    let trafficChartInstance = null;
    let incomeChartInstance = null;

    try {
      const ctxTraffic = document
        .getElementById("trafficChart")
        .getContext("2d");
      const ctxIncome = document.getElementById("incomeChart").getContext("2d");

      if (trafficChartInstance) {
        trafficChartInstance.destroy();
      }
      if (incomeChartInstance) {
        incomeChartInstance.destroy();
      }

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
      if (trafficChartRef.current) {
        trafficChartRef.current.destroy();
      }
      if (incomeChartRef.current) {
        incomeChartRef.current.destroy();
      }
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            HR Dashboard
          </h2>
          <p className="text-black mb-6">
            This dashboard provides an overview of job postings, candidate
            applications, and performance metrics. Use the charts and data below
            to manage your hiring process effectively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                New Applications
              </h3>
              <p className="text-3xl font-bold text-black">
                {metrics.newApplications}
              </p>
              <span className="text-green-600">+14%</span>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                Total Hires
              </h3>
              <p className="text-3xl font-bold text-black">
                {metrics.totalHires}
              </p>
              <span className="text-red-600">-7%</span>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                Total Income
              </h3>
              <p className="text-3xl font-bold text-black">
                {metrics.totalIncome}
              </p>
              <span className="text-green-600">+8%</span>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                Pending Applications
              </h3>
              <p className="text-3xl font-bold text-black">
                {metrics.pendingApplications}
              </p>
              <span className="text-orange-600">+5%</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                Traffic Sources
              </h3>
              <canvas id="trafficChart" width="400" height="200"></canvas>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">Income</h3>
              <canvas id="incomeChart" width="200" height="200"></canvas>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                Quick Actions
              </h3>
              <Link
                to="/view-candidates"
                className="block text-blue-600 hover:underline mb-2"
              >
                View Candidates
              </Link>
              <Link
                to="/generate-report"
                className="block text-blue-600 hover:underline mb-2"
              >
                Generate Report
              </Link>
              <Link
                to="/edit-profile"
                className="block text-blue-600 hover:underline"
              >
                Edit Profile
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                Interviews Scheduled
              </h3>
              <p className="text-3xl font-bold text-black">
                {metrics.interviewsScheduled}
              </p>
              <span className="text-green-600">+10%</span>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600">
                Job Openings
              </h3>
              <p className="text-3xl font-bold text-black">
                {metrics.jobOpenings}
              </p>
              <span className="text-purple-600">+2%</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-600">
              Recent Activities
            </h3>
            <ul className="text-black list-disc pl-5">
              <li>New application from John Doe - 12:30 PM, Jul 15, 2025</li>
              <li>Job posted: Senior Developer - 10:00 AM, Jul 15, 2025</li>
              <li>
                Interview scheduled for Jane Smith - 9:00 AM, Jul 16, 2025
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <Link
              to="/create-job"
              className="block w-48 bg-blue-600 text-white p-2 rounded-md text-center hover:bg-blue-700"
            >
              Create New Job
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
