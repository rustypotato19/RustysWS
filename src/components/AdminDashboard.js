import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [modalRequest, setModalRequest] = useState(null); // For the modal
  const [sortByDate, setSortByDate] = useState(false); // For sorting by date
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
    } else {
      axios
        .get("https://rustyws.com/api/admin/requests", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("API Response:", res.data);
          setRequests(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            navigate("/admin-login");
          }
          else if (err.response && err.response.status === 403){
            navigate("/admin-login");
          } 
          else {
            setError("Error fetching requests.");
            console.error(err);
          }
        });
    }
  }, [navigate]);

  const updateStatus = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://rustyws.com/api/admin/requests/${ticketId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.ticket_id === ticketId ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      setError("Error updating status.");
    }
  };

  const deleteEntry = async (ticketId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://rustyws.com/api/admin/requests/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(requests.filter((req) => req.ticket_id !== ticketId));
    } catch (err) {
      setError("Error deleting entry.");
    }
  };

  const updateContacted = async (ticketId, contactedStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://rustyws.com/api/admin/requests/${ticketId}/contacted`,
        { contacted: contactedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.ticket_id === ticketId ? { ...req, contacted: contactedStatus } : req
        )
      );
    } catch (err) {
      setError("Error updating contacted status.");
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSortByDate = () => {
    const sortedRequests = [...requests].sort((a, b) => {
      return sortByDate
        ? new Date(a.request_date) - new Date(b.request_date) // Sort by ascending if sortByDate is true
        : new Date(b.request_date) - new Date(a.request_date); // Sort by descending if sortByDate is false
    });
    setRequests(sortedRequests);
    setSortByDate(!sortByDate); // Toggle the sort order
  };

  const openModal = (request) => {
    setModalRequest(request); // Set the selected request
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalRequest(null); // Clear the selected request
  };

  const filteredRequests = Array.isArray(requests)
    ? requests.filter(
        (request) =>
          request.contact_info.includes(filter) ||
          request.status.includes(filter) ||
          request.request_type.includes(filter) ||
          request.ticket_id.includes(filter)
      )
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-between h-16 mb-4">
        <input
          type="text"
          placeholder="Filter by contact, status, request type, or ticket ID..."
          value={filter}
          onChange={handleFilter}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full h-full"
        />
        <button
          onClick={handleSortByDate}
          className="flex items-center justify-center flex-row bg-blue-500 text-white text-sm px-4 py-2 ml-2 rounded-lg" 
        >
          Sort: {sortByDate ? "Oldest" : "Newest"}
        </button>
      </div>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Ticket ID</th>
            <th className="py-2 px-4 border-b">Contact Info</th>
            <th className="py-2 px-4 border-b">Request Type</th>
            <th className="py-2 px-4 border-b">Priority</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Contacted</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">No requests found</td>
            </tr>
          ) : (
            filteredRequests.map((request) => (
              <tr key={request.ticket_id} className="text-center">
                <td className="py-2 px-3 border-b cursor-pointer" onClick={() => openModal(request)}>
                  {request.ticket_id}
                </td>
                <td className="py-2 px-3 border-b">{request.contact_info}</td>
                <td className="py-2 px-3 border-b">{request.request_type}</td>
                <td className="py-2 px-3 border-b">{request.priority}</td>
                <td className="py-2 px-3 border-b">
                  {new Date(request.request_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 border-b">{request.status}</td>
                <td className="py-2 px-3 border-b">{request.contacted ? "Yes" : "No"}</td>
                <td className="py-4 px-3 border-b">
                  <select
                    className="p-2 rounded bg-gray-200"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "started") updateStatus(request.ticket_id, "in_progress");
                      else if (value === "finished") updateStatus(request.ticket_id, "finished");
                      else if (value === "contacted") updateContacted(request.ticket_id, 1);
                      else if (value === "delete") deleteEntry(request.ticket_id);
                    }}
                  >
                    <option value="">Select Action</option>
                    <option value="started">Started</option>
                    <option value="finished">Finished</option>
                    <option value="contacted">Contacted</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && modalRequest && (
        <div className="w-full flex justify-center items-center">
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md max-w-3xl w-full max-h-[80vh] overflow-auto">
              <h2 className="text-xl font-bold mb-4">Request Details</h2>
              <p><strong>Ticket ID:</strong> {modalRequest.ticket_id}</p>
              <p><strong>Contact Info:</strong> {modalRequest.contact_info}</p>
              <p><strong>Request Type:</strong> {modalRequest.request_type}</p>
              <p><strong>Priority:</strong> {modalRequest.priority}</p>
              <p><strong>Description:</strong></p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-auto max-h-[30vh] break-words">
                {modalRequest.description}
              </div>
              <p><strong>Date:</strong> {new Date(modalRequest.request_date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {modalRequest.status}</p>
              <p><strong>Contacted:</strong> {modalRequest.contacted ? "Yes" : "No"}</p>
              <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
