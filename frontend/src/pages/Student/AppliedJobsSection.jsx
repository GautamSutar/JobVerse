import React from "react";

export default function AppliedJobsSection() {
  const totalApplied = 5; // Replace with API fetch later

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Jobs You've Applied</h2>
      <p className="text-gray-700 text-lg font-bold">{totalApplied}</p>
    </div>
  );
}
