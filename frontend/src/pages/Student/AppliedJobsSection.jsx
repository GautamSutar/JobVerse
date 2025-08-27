import React from "react";
import { SectionCard } from "./SectionCard"; // Assumes SectionCard is in the same folder
import { FiBriefcase } from "react-icons/fi";
export const AppliedJobsSection = () => {
  const appliedJobs = [
    {
      id: 1,
      title: "Software Engineer Intern",
      company: "Tech Solutions Inc.",
      status: "Pending",
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Data Insights LLC",
      status: "Accepted",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Creative Minds Co.",
      status: "Rejected",
    },
  ];
  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };
  return (
    <SectionCard title="Recently Applied Jobs" icon={FiBriefcase}>
      <div className="space-y-4">
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <div
              key={job.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            You haven't applied to any jobs yet.
          </p>
        )}
      </div>
    </SectionCard>
  );
};
