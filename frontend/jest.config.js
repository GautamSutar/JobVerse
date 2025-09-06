// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    // Handle CSS imports (for Tailwind/PostCSS)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Handle image/video imports
    "\\.(jpg|jpeg|png|gif|webp|svg|mp4)$": "<rootDir>/tests/mocks/fileMock.js",
    // Alias for base URL, e.g., if you have path aliases in tsconfig/jsconfig
    "^@/(.*)$": "<rootDir>/src/$1",
    // Map axiosInstance if it's imported with a specific path
    "^axiosInstance$": "<rootDir>/tests/mocks/axiosInstance.js", // Adjust if needed
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  // If using Vite and your environment variables are VITE_REACT_APP_...
  globals: {
    "import.meta.env.VITE_REACT_APP_BACKEND_BASEURL": "http://mock-api.com/api",
  },
};
