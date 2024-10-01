import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Submitted Requests</h2>
      {requests.length === 0 ? (
        <p>No requests have been submitted yet.</p>
      ) : (
        <ul>
          {requests.map((request, index) => (
            <li key={index} className="bg-white p-4 mb-4 shadow-md rounded-lg">
              <h3 className="text-xl font-bold">{request.requestType}</h3>
              <p><strong>Contact:</strong> {request.contactInfo}</p>
              <p><strong>Description:</strong> {request.description || "No description provided"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestsPage;
