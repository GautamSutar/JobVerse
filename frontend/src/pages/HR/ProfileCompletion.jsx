import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCompletion = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyEmail: "",
    companyName: "",
    designation: "",
    phone: "",
    companyWebsite: "",
    country: "",
    logo: null,
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate profile save and redirect
    navigate("/hr-dashboard");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-white p-8 mt-32">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Complete Your HR Profile
        </h2>
        <p className="text-black text-center mb-6">
          Fill out the details below to set up your HR profile and start
          managing job postings effectively. All fields marked with * are
          mandatory.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-6 col-span-1">
            <div>
              <label className="block text-black font-medium">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black font-medium">Email ID *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Company Email ID *
              </label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Company Website *
              </label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Country / Address *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Company Logo (Optional)
              </label>
              <input
                type="file"
                name="logo"
                onChange={(e) =>
                  setFormData({ ...formData, logo: e.target.files[0] })
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit Profile
            </button>
          </form>
          <div className="col-span-1 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Company Overview
            </h3>
            <p className="text-black mb-2">
              Provide a brief description of your company to enhance your job
              postings and attract the right talent.
            </p>
            <ul className="text-black list-disc pl-5">
              <li>Established: [Year]</li>
              <li>Industry: [Industry Type]</li>
              <li>Employees: [Number]</li>
              <li>Location: [Main Office]</li>
            </ul>
            <p className="text-black mt-4">
              This information will be visible to candidates and help build
              trust and credibility.
            </p>
            <div className="mt-4 text-center">
              <img
                src="https://via.placeholder.com/200x100"
                alt="Company Banner"
                className="rounded-md"
              />
              <p className="text-sm text-gray-600 mt-2">
                Add a banner or logo to personalize your profile.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Why Complete Your Profile?
          </h3>
          <p className="text-black">
            A complete profile ensures your job postings are professional,
            credible, and reach the right audience. It also allows for better
            candidate management and communication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
