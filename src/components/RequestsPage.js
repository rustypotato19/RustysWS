import React, { useState } from "react";
import axios from "axios";

const RequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRequest, setFilteredRequest] = useState(null);
  const [error, setError] = useState("");

  const fetchRequestByTicketId = async (ticketId) => {
    try {
      const response = await axios.get(`http://rustyws.com:5000/api/request/${ticketId}`);
      setFilteredRequest(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching request:", error);
      setError("No request found with that ticket ID.");
      setFilteredRequest(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchRequestByTicketId(searchTerm);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Search Your Request</h2>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          placeholder="Enter your ticket ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display the Request */}
      {filteredRequest ? (
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-xl font-bold">{filteredRequest.request_type}</h3>
          <p><strong>Ticket ID:</strong> {filteredRequest.ticket_id}</p>
          <p><strong>Priority:</strong> {filteredRequest.priority}</p>
          <p><strong>Status:</strong> {filteredRequest.status}</p>
          <p><strong>Contact Info:</strong> {filteredRequest.contact_info}</p>
          <p><strong>Date:</strong> {new Date(filteredRequest.request_date).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {filteredRequest.description || "No description provided"}</p>
        </div>
      ) : (
        <p className="text-gray-500">Enter a ticket ID to search for your request.</p>
      )}
    </div>
  );
};

export default RequestsPage;
