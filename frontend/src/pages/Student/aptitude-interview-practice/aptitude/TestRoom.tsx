import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore/authStore";

const TestRoom = () => {
  return (
    <div className="min-h-screen mt-24 text-white bg-gray-900 p-8 font-sans">
      <header className="flex justify-between w-full max-w-4xl mb-8 items-center ">
        <h1 className="text-2xl font-bold">Question-Category</h1>
        <div className="text-2xl font-mono bg-gray-700 py-2 px-4 rounded">
          60:60:100
        </div>
      </header>
      <main className="w-full  max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <p className="mb-2 text-sm text-gray-400 ">
          Question ID: X9VB5tpnbdTMjzuftCEY2 | Difficulty: Hard
        </p>
        <h2 className="text-3xl font-semibold mb-6 ">Question Text</h2>
        <div></div>
      </main>
    </div>
  );
};

export default TestRoom;
