import React, { useState, useEffect } from "react";
import axios from "axios";

const FormModal = ({ isOpen, onClose }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    requestType: "",
    contactInfo: "",
    description: ""
  });
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(500);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "description") {
      setCharCount(500 - value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.contactInfo) && !/^\d+$/.test(formData.contactInfo)) {
      setError("Please provide a valid email or phone number.");
      return;
    }

    try {
      // Sending form data to the backend
      await axios.post("http://localhost:5000/submit-request", formData);
      alert("Request submitted successfully!");
      onClose();
    } catch (error) {
      setError("Error submitting request. Please try again.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal with Slide-Up Animation */}
      <div className={`relative bg-white rounded-lg shadow-lg p-8 mx-4 z-10 max-w-md w-full transform transition-all duration-500 ease-in-out ${animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="request-type" className="block text-gray-700">Request Type</label>
            <select id="request-type" name="requestType" value={formData.requestType} onChange={handleInputChange} className="w-full text-black border border-gray-300 rounded-lg p-2 mt-1" required>
              <option value="">Choose request type...</option>
              <option value="web-development-small">Web Development (Small)</option>
              <option value="web-development-large">Web Development (Large)</option>
              <option value="plugin-development">Plugin Development</option>
              <option value="standalone-project">Standalone Project</option>
              <option value="other">Other (Specify)</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-info" className="block text-gray-700">Contact Email/Number</label>
            <input placeholder="Enter your email or phone number" type="text" id="contact-info" name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} className="w-full text-black border border-gray-300 rounded-lg p-2 mt-1" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">Description (Optional)</label>
            <textarea placeholder="Describe your project or request" maxLength="500" rows="5" id="description" name="description" value={formData.description} onChange={handleInputChange} className="w-full text-black border border-gray-300 rounded-lg p-2 mt-1"></textarea>
            <div className="text-right text-gray-500 text-sm">{charCount} characters remaining</div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="bg-gray-400 text-white py-2 px-4 rounded-lg mr-4" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
