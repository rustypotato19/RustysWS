import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]); // Ensure requests is initialized as an empty array
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all requests
    axios
      .get("https://rustyws.com/api/admin/requests", {
        headers: { Authorization: "ws0k4n0p8i1s9" },
      })
      .then((res) => {
        console.log('API Response:', res.data); // Add this line to debug
        setRequests(res.data);
      })
      .catch((err) => {
        setError("Error fetching requests.");
        console.error(err); // Log the error
      });
  }, []); 

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `https://rustyws.com/api/admin/requests/${id}/status`, // Updated URL
        { status: newStatus },
        { headers: { Authorization: "ws0k4n0p8i1s9" } }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      setError("Error updating status.");
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(
        `https://rustyws.com/api/admin/requests/${id}`,
        { headers: { Authorization: "ws0k4n0p8i1s9" } }
      );
      setRequests(requests.filter((req) => req.id!== id));
    } catch (err) {
      setError("Error deleting entry.");
    }
  };

  const updateContacted = async (id, contactedStatus) => {
    try {
      await axios.put(
        `https://rustyws.com/api/admin/requests/${id}/contacted`, // Updated URL
        { contacted: contactedStatus },
        { headers: { Authorization: "ws0k4n0p8i1s9" } }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, contacted: contactedStatus } : req
        )
      );
    } catch (err) {
      setError("Error updating contacted status.");
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  // Ensure requests is an array before filtering
  const filteredRequests = Array.isArray(requests) ? requests.filter(
    (request) =>
      request.contact_info.includes(filter) ||
      request.status.includes(filter) ||
      request.request_type.includes(filter)
  ) : [];
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      
      {error && <p className="text-red-500">{error}</p>}

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter by contact, status, or request type..."
        value={filter}
        onChange={handleFilter}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />

      {/* Requests Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Contact Info</th>
            <th className="py-2 px-4 border-b">Request Type</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Contacted</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No requests found
              </td>
            </tr>
          ) : (
            filteredRequests.map((request) => (
              <tr key={request.id} className="">
                <td className="py-2 px-3 border-b">{request.contact_info}</td>
                <td className="py-2 px-3 border-b">{request.request_type}</td>
                <td className="py-2 px-3 border-b">{request.description}</td>
                <td className="py-2 px-3 border-b">{request.status}</td>
                <td className="py-2 px-3 border-b">
                  {request.contacted ? "Yes" : "No"}
                </td>
                <td className="py-4 px-3 border-b flex gap-2">
                  <button
                    className="bg-blue-800 text-white px-2 py-1 rounded-lg h-full"
                    onClick={() =>
                      updateStatus(request.id, "in_progress")
                    }
                  >
                    Started
                  </button>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded-lg h-full"
                    onClick={() =>
                      updateStatus(request.id, "finished")
                    }
                  >
                    Finished
                  </button>
                  <button
                    className="bg-green-900 text-white px-2 py-1 rounded-lg h-full"
                    onClick={() => updateContacted(request.id, 1)}
                  >
                    Contacted
                  </button>
                  <button
                    className="bg-red-700 text-white px-2 py-1 rounded-lg h-full"
                    onClick={() =>
                      deleteEntry(request.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
