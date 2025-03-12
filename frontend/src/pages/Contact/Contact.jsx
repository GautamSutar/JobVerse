import { useState } from 'react';

const Contact = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted!")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-12">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Contact Info */}
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        <div className="flex flex-col gap-3 mb-6">
          <a href="#" className="flex items-center gap-2 text-gray-700">
            📸 Instagram: @yourprofile
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700">
            🔗 LinkedIn: /in/yourprofile
          </a>
          <a href="mailto:yourmail@gmail.com" className="flex items-center gap-2 text-gray-700">
            ✉ Email: yourmail@gmail.com
          </a>
        </div>

        {/* Feedback Image */}
        <img 
          src="/assets/images/contact/image.jpg"
          alt="Feedback"
          className="w-full h-40 object-cover mb-4 rounded-lg"
        />

        {/* Feedback Form */}
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-2">Help Us Improve</h3>
          <p className="text-gray-600 mb-4">
            Have suggestions or feedback? Let us know how we can make SkillCheck better!
          </p>
          {/* <div className="border"> */}
          <textarea 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Your feedback..."
            required
          />
          {/* </div> */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;