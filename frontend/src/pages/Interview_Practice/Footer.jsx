// src/components/PracticePage/Footer.jsx
import React from "react";

const Footer = ({ sessionHistory }) => (
  <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50 flex justify-between">
    <span>AI Interview Practice Tool</span>
    <span>{sessionHistory.length} responses recorded this session</span>
  </div>
);

export default Footer;
