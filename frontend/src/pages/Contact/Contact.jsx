import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiMessageSquare,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";

// --- Main Contact Page Component ---
export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen mt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Part 1: Header and Contact Form */}
        <HeaderAndForm />

        {/* Part 2: Contact Details and Social Links */}
        <ContactInfo />

        {/* Part 3: FAQ and Map */}
        <FaqAndMap />
      </div>
      <footer className="text-center py-8 text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} SkillCheck | All rights reserved.
      </footer>
    </div>
  );
}

// --- Sub-components for a clean and organized structure ---

const HeaderAndForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const mailtoLink = `mailto:yourmail@gmail.com?subject=Contact Form: ${name}&body=Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white p-8 md:p-12 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Background abstract shapes */}
      <div className="absolute top-0 right-0 -z-0">
        <svg
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          role="img"
          aria-labelledby="svg-squares"
        >
          <title id="svg-squares">Abstract squares</title>
          <defs>
            <pattern
              id="squares-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200"
                fill="currentColor"
              ></rect>
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#squares-pattern)"></rect>
        </svg>
      </div>

      {/* Text Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Have a question, feedback, or just want to say hello? We'd love to
          hear from you. Fill out the form and we'll get back to you as soon as
          possible.
        </p>
      </div>

      {/* Form */}
      <div className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            icon={FiUser}
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <InputField
            icon={FiMail}
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <FiMessageSquare className="absolute top-3.5 left-4 text-gray-400" />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            Send Message <FiArrowRight />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute top-3.5 left-4 text-gray-400" />
    <input
      {...props}
      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
    />
  </div>
);

const ContactInfo = () => {
  const infoItems = [
    { icon: FiPhone, text: "+91 8817181384", href: "tel:+918817181384" },
    {
      icon: FiMail,
      text: "exoic.jobverse.in@gmail.com",
      href: "mailto:yourmail@gmail.com",
    },
    { icon: FiMapPin, text: "Indore, Madhya Pradesh, India", href: "#" },
  ];
  const socialItems = [
    {
      icon: FiInstagram,
      href: "https://instagram.com",
      color: "hover:text-pink-600",
    },
    {
      icon: FiLinkedin,
      href: "https://linkedin.com",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <div className="my-20 text-center">
      <div className="grid md:grid-cols-3 gap-8">
        {infoItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4"
          >
            <item.icon className="text-indigo-600 h-8 w-8" />
            <span className="text-gray-700">{item.text}</span>
          </motion.a>
        ))}
      </div>
      <div className="mt-12 flex justify-center gap-6">
        {socialItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className={`p-4 bg-white rounded-full shadow-md text-gray-600 transition-colors ${item.color}`}
          >
            <item.icon size={24} />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

const FaqAndMap = () => {
  const faqs = [
    {
      q: "How do I reset my password?",
      a: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
    },
    {
      q: "Can I edit my profile info?",
      a: "Yes, absolutely! You can edit all your profile information from your personal dashboard after logging in.",
    },
    {
      q: "How to schedule an interview?",
      a: "Once a company shows interest, you will receive an email with a link to schedule your interview at a convenient time.",
    },
    {
      q: "What is an ATS score?",
      a: "An ATS (Applicant Tracking System) score indicates how well your resume is optimized for automated systems used by recruiters. A higher score increases your visibility.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* FAQ Accordion */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
      {/* Map */}
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h2>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <iframe
            title="Map"
            src="https://maps.google.com/maps?q=indore&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "#f3f4f6" : "#ffffff" }}
      className="border rounded-lg"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800"
      >
        {question}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <FiChevronDown />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <p className="p-4 pt-0 text-gray-600">{answer}</p>
      </motion.div>
    </motion.div>
  );
};
