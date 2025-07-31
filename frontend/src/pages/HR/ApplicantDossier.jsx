import React from "react";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiFileText,
  FiBookOpen,
  FiAward,
  FiUser,
  FiInfo,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

const InfoItem = ({ icon, label, children }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-6 mt-1 text-gray-400">{icon}</div>
    <div className="ml-3">
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <div className="text-md text-gray-800">{children}</div>
    </div>
  </div>
);

const ApplicantDossier = ({ applicant, onScheduleClick }) => {
  const { resume, resume_score, student, job } = applicant;
  const user = student?.student_profile?.user;
  const profile = student?.student_profile;
  const hr = job?.hr?.hr_profile;

  if (!user || !profile || !hr) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg shadow-md">
        Incomplete data for this applicant. Please check the API response.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mr-5">
              <FiUser className="text-indigo-500 text-4xl" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-lg text-indigo-600 font-medium">
                {user.email}
              </p>
            </div>
          </div>
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 w-full sm:w-auto shrink-0 inline-flex items-center justify-center px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            <FiFileText className="mr-2" /> View Resume
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h4 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <FiBarChart2 className="mr-3 text-indigo-500" />
                Screening Scores
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-gray-500">
                    Resume Score
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {Math.round(resume_score)}%
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-gray-500">ATS</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {profile.ats_score || "N/A"}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-gray-500">Aptitude</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {profile.aptitude_score || "N/A"}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-gray-500">AI Score</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {profile.ai_score || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <FiBookOpen className="mr-3 text-indigo-500" />
                Education
              </h4>
              <div className="space-y-4">
                <InfoItem icon={<FiAward />} label="Degree">
                  {profile.degree} in {profile.branch}
                </InfoItem>
                <InfoItem icon={<FiBookOpen />} label="College">
                  {profile.college_name}
                </InfoItem>
                <InfoItem icon={<FiCalendar />} label="Graduation">
                  {profile.graduation_year}
                </InfoItem>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
              <FiInfo className="mr-3 text-indigo-500" />
              Contact & Actions
            </h4>
            <div className="space-y-4">
              <InfoItem icon={<FiPhone />} label="Mobile">
                {profile.mobile_number}
              </InfoItem>
              <InfoItem icon={<FiLinkedin />} label="LinkedIn">
                <a
                  href={profile.linkedin_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View Profile
                </a>
              </InfoItem>
              <InfoItem icon={<FiGithub />} label="GitHub">
                <a
                  href={profile.github_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View Profile
                </a>
              </InfoItem>
            </div>

            <div className="mt-6 pt-6 border-t">
              {applicant.is_scheduled ? (
                <div className="flex items-center justify-center text-green-600 font-semibold p-3 bg-green-50 rounded-lg">
                  <FiCheckCircle className="mr-3" size={20} />
                  Interview Scheduled
                </div>
              ) : (
                <button
                  onClick={onScheduleClick}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiCalendar className="mr-2" />
                  Schedule Interview
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDossier;
