import React from "react";

// This is the corrected SectionCard. The only change is removing `h-full`.
export function SectionCard({ title, icon, children }) {
  const IconComponent = icon;

  return (
    // The `h-full` class has been removed from here to allow natural height.
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
        {IconComponent && <IconComponent className="h-6 w-6 text-indigo-600" />}
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}
