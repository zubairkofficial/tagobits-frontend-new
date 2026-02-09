import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axios';

interface Ticket {
  id: number;
  name: string;
  email: string;
  subject: string;
  description: string;
  submission_date: string;
  reply: string | null;
  status: string;
}

const AdminTicketPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchTickets = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/support-tickets?page=${page}&limit=${limit}`);
      setTickets(response.data.tickets);
      const totalCount = response.data.total_count;
      setTotalPages(Math.ceil(totalCount / limit));
      setError(null);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage]);

  const handleDelete = async (ticketId: number) => {
    try {
      await axiosInstance.delete(`/support-tickets/${ticketId}`);
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
      setSelectedTicket(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete ticket. Please try again.');
    }
  };

  const handleReply = async (ticketId: number) => {
    if (!replyText.trim()) {
      setError('Reply cannot be empty.');
      return;
    }
    try {
      const response = await axiosInstance.post(`/support-tickets/${ticketId}/reply`, { reply: replyText });
      const updatedTicket = response.data;
      setTickets(tickets.map((ticket) => (ticket.id === ticketId ? updatedTicket : ticket)));
      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket(updatedTicket);
      }
      setReplyText('');
      setError(null);
    } catch (err) {
      setError('Failed to send reply. Please try again.');
    }
  };

  const openTicketPopup = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setReplyText('');
  };

  const closeTicketPopup = () => {
    setSelectedTicket(null);
    setReplyText('');
    setError(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSelectedTicket(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08247D]/5 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-medium text-[#08247D] mb-6 text-center">Admin Ticket Dashboard</h1>
        
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {loading ? (
          <div className="text-center text-gray-600">Loading tickets...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center text-gray-600">No tickets found.</div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`bg-white border rounded-xl shadow-sm transition-all duration-200 ${
                  ticket.status === 'replied'
                    ? 'border-green-500 bg-green-50'
                    : 'border-[#08247D]/10'
                }`}
              >
                <div
                  className="p-4 cursor-pointer hover:bg-[#08247D]/5"
                  onClick={() => openTicketPopup(ticket)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-medium text-[#08247D]">
                        {ticket.subject}
                      </h2>
                      <p className="text-sm text-gray-600">By: {ticket.name}</p>
                      <p className="text-sm text-gray-600">Email: {ticket.email}</p>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(ticket.submission_date).toLocaleString()}
                      </p>
                      <p className={`text-sm font-medium ${
                        ticket.status === 'replied' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        Status: {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popup/Modal for Ticket Details */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 relative">
              <button
                onClick={closeTicketPopup}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-xl font-medium text-[#08247D] mb-4">{selectedTicket.subject}</h2>
              <p className="text-sm text-gray-600 mb-2"><strong>Name:</strong> {selectedTicket.name}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Email:</strong> {selectedTicket.email}</p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Submitted:</strong> {new Date(selectedTicket.submission_date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Status:</strong> 
                <span className={selectedTicket.status === 'replied' ? 'text-green-600 font-medium' : 'text-gray-600'}>
                  {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Description:</strong> {selectedTicket.description}
              </p>
              {selectedTicket.reply && (
                <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
                  <p className="text-sm text-gray-600 font-medium">Admin Reply:</p>
                  <p className="text-sm text-gray-700">{selectedTicket.reply}</p>
                </div>
              )}

              {selectedTicket.status !== 'replied' && (
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-xl"
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                  />
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeTicketPopup}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 shadow-sm text-base font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedTicket.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-sm text-base font-medium"
                >
                  Delete Ticket
                </button>
                {selectedTicket.status !== 'replied' && (
                  <button
                    onClick={() => handleReply(selectedTicket.id)}
                    className="px-4 py-2 bg-[#08247D] text-white rounded-xl hover:bg-[#08247D]/90 transition-all duration-200 shadow-sm text-base font-medium"
                    disabled={!replyText.trim()}
                  >
                    Reply
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#08247D] text-white hover:bg-[#08247D]/90'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#08247D] text-white hover:bg-[#08247D]/90'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTicketPage;