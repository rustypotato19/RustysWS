// ViewTicketPage.js
import React, { useState } from "react";
import axios from "axios";

const ViewTicketPage = () => {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setTicketId(e.target.value);
  };

  const handleSearch = async () => {
    if (!ticketId) {
      setError("Please enter a ticket ID.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.get(`https://rustyws.com/api/tickets/${ticketId}`);
      setTicketData(response.data);
    } catch (err) {
      setError("Ticket not found. Please check the ticket ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 h-[calc(100vh-15rem)]">
      <h2 className="text-3xl font-bold mb-6">View Ticket</h2>
      <div className="flex flex-row">
        <input
          type="text"
          placeholder="Enter your Ticket ID"
          value={ticketId}
          onChange={handleInputChange}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4">
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {ticketData && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">{ticketData.request_type}</h3>
          <p><strong>Priority:</strong> {ticketData.priority}</p>
          <p><strong>Contact Info:</strong> {ticketData.contact_info}</p>
          <p><strong>Description:</strong></p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">{ticketData.description || "No description provided"}</div>
          <p><strong>Request Date:</strong> {new Date(ticketData.request_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {ticketData.status}</p>
          <p><strong>Contacted:</strong> {ticketData.contacted ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default ViewTicketPage;
