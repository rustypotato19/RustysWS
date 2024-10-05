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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    setError(""); // Clear any previous error
    setLoading(true); // Start loading

    setTimeout(async () => {
      // Simulate delay of 3-6 seconds
      try {
        await axios.post("https://rustyws.com/api/submit-request", formData);
        setLoading(false); // Stop loading
        setSuccess(true); // Show success message
      } catch (error) {
        setLoading(false); // Stop loading
        setError("Error submitting request. Please try again.");
        
        // Log the full error object for better debugging:
        console.error("Submission Error:", error.response || error.message || error);
      }
      
    }, Math.random() * (6000 - 3000) + 3000); // Random delay between 3-6 seconds
  };

  const handleClose = () => {
    // Reset the modal state on close
    setFormData({
      requestType: "",
      contactInfo: "",
      description: ""
    });
    setCharCount(500);
    setSuccess(false);  // Reset the success message
    setError("");       // Clear any previous errors
    onClose();          // Trigger parent onClose if any
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleClose}></div>

      {/* Modal with Slide-Up Animation */}
      <div className={`relative bg-white rounded-lg shadow-lg p-8 mx-4 z-10 max-w-md w-2/3 sm:w-full  transform transition-all duration-500 ease-in-out ${animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        {!success ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

            {error && <p className="text-red-500">{error}</p>}

            {loading ? (
              <div className="flex justify-center items-center">
                {/* Displaying loading GIF */}
                <iframe
                  src="\images\gifs\loading.gif"
                  title="loading"
                  width="250"
                  height="250"
                  className="rounded overflow-auto ml-10"
                ></iframe>
              </div>
            ) : (
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
                  <button type="button" className="bg-gray-400 text-white py-2 px-4 rounded-lg mr-4" onClick={handleClose}>Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800">Submit</button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
            <p className="text-green-500">Your request has been submitted successfully.</p>
            <button onClick={handleClose} className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormModal;
