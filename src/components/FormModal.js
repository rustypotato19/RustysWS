import React, { useState, useEffect } from "react";
import axios from "axios";
import LoaderComponent from "./LoadingSpinner";

const FormModal = ({ isOpen, onClose }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    requestType: "",
    contactInfo: "",
    description: "",
    priority: "Low", // Default priority
  });
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(500);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState(""); // This will hold the generated ticket ID

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

  // Generate the ticket ID based on priority, request type, and a random string
  const generateTicketId = () => {
    const priorityCode = formData.priority[0].toLowerCase(); // "l", "m", "h"
    const requestTypeCode = formData.requestType.split("-")[0].slice(0, 4); // E.g., "web", "plug", "stan"
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // "yymmdd" format
    const randomStr = Math.random().toString(36).substring(2, 6); // 4-char alphanumeric

    return `${priorityCode}-${requestTypeCode}-${dateCode}-${randomStr}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate contact info
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/;
    if (!/\S+@\S+\.\S+/.test(formData.contactInfo) && !phoneRegex.test(formData.contactInfo)) {
      setError("Please provide a valid email or phone number.");
      return;
    }
  
    // Clear error and start loading
    setError("");
    setLoading(true);
  
    // Generate ticket ID and save it in the state
    const generatedTicketId = generateTicketId();
    setTicketId(generatedTicketId);
  
    // Prepare submission data
    const submissionData = {
      ticketId: generatedTicketId, // Include ticketId in the request data
      requestType: formData.requestType,
      contactInfo: formData.contactInfo,
      description: formData.description,
      priority: formData.priority,
    };
  
    try {
      await axios.post("https://rustyws.com/api/submit-request", submissionData);
  
      // Simulate delay before showing success message
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, Math.random() * (6500 - 4000) + 4000); // 3-second delay
    } catch (error) {
      setLoading(false);
      setError("Error submitting request. Please try again.");
      console.error("Submission Error:", error.response || error.message || error);
    }
  };
  

  const handleClose = () => {
    // Reset state on close
    setFormData({
      requestType: "",
      contactInfo: "",
      description: "",
      priority: "Low", // Reset priority to default
    });
    setCharCount(500);
    setSuccess(false);
    setError("");
    setTicketId(""); // Reset ticket ID
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleClose}></div>

      {/* Modal */}
      <div className={`text-rws-gray relative bg-white rounded-lg shadow-lg p-8 mx-4 z-10 max-w-md w-full transform transition-all duration-500 ease-in-out ${animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        {!success ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {loading ? ("") : ("Request Service")}
            </h2>  
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
              <LoaderComponent />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="request-type" className="block text-gray-700">Request Type</label>
                  <select id="request-type" name="requestType" value={formData.requestType} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1 " required>
                    <option value="">Request type...</option>
                    <option value="web-development-small">Web Development (Small)</option>
                    <option value="web-development-large">Web Development (Large)</option>
                    <option value="plugin-development">Plugin Development</option>
                    <option value="standalone-project">Standalone Project</option>
                    <option value="other">Other (Specify)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-gray-700">Priority</label>
                  <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1" required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High (+£10)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-info" className="block text-gray-700">Contact Email/Number</label>
                  <input type="text" id="contact-info" name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1" placeholder="example@email.com" required />
                </div>

                <div>
                  <label htmlFor="description" className="block text-gray-700">Description (Optional)</label>
                  <textarea maxLength="500" rows="5" id="description" name="description" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1" placeholder="Something to describe your needs"></textarea>
                  <div className="text-right text-gray-500 text-sm">{charCount} characters remaining</div>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="bg-gray-400 text-black py-2 px-4 rounded-lg mr-4" onClick={handleClose}>Cancel</button>
                  <button type="submit" className="bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-800">Submit</button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Success!</h2>
            <p className="text-green-700 text-opacity-60 mb-2" >Your request has been submitted successfully.</p>
            <p className="text-black text-sm">Your ticket ID is [{ticketId}].<br/>You will recieve an email shortly confirming your request details.</p>
            <p className="text-gray-500 text-xs mt-2">I aim to contact you within 72 hours regarding your request<br /><span>(Includes Weekends)</span></p>
            <button onClick={handleClose} className="mt-4 bg-green-600 text-rws-gray py-2 px-4 rounded-lg hover:bg-green-800">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormModal;
