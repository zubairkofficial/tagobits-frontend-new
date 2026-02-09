import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../helper/axios';

const AdminTicketHandler = () => {
  const [handlers, setHandlers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete confirmation modal
  const [handlerToDelete, setHandlerToDelete] = useState<number | null>(null); // Track handler to delete

  useEffect(() => {
    fetchHandlers();
  }, []);

  const fetchHandlers = async () => {
    try {
      const response = await axiosInstance.get('/ticket-handlers');
      setHandlers(response.data.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to fetch ticket handlers', {
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        duration: 5000,
      });
    }
  };

  const createHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/create-ticket-handler', formData);
      toast.success(response.data.detail, {
        style: {
          background: '#2E3293',
          color: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        duration: 5000,
      });
      setShowModal(false);
      setFormData({ name: '', email: '', password: '' });
      fetchHandlers();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to create ticket handler', {
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        duration: 5000,
      });
    }
  };

  const deleteHandler = async (userId: number) => {
    try {
      const response = await axiosInstance.delete(`/delete-user/${userId}`);
      toast.success(response.data.detail, {
        style: {
          background: '#2E3293',
          color: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        duration: 5000,
      });
      fetchHandlers();
      setShowDeleteModal(false); // Close delete modal
      setHandlerToDelete(null); // Reset handler to delete
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to delete ticket handler', {
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        duration: 5000,
      });
    }
  };

  const openDeleteModal = (userId: number) => {
    setHandlerToDelete(userId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setHandlerToDelete(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary-dark">Ticket Handlers</h1>

      <button
        onClick={() => setShowModal(true)}
        className="block mx-auto mb-10 px-6 py-3 bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-primary hover:shadow-lg hover:brightness-110 active:scale-95"
      >
        Add New Ticket Handler
      </button>

      {/* Modal for Adding Handler */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-500 ease-out animate-in zoom-in-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-primary-dark">Add New Handler</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-primary-dark transition-all duration-200 hover:scale-110 active:scale-90"
              >
                ✕
              </button>
            </div>
            <form onSubmit={createHandler} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="w-full p-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 hover:border-primary-dark shadow-sm"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full p-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 hover:border-primary-dark shadow-sm"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="w-full p-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 hover:border-primary-dark shadow-sm"
              />
              <button
                type="submit"
                className="w-full p-4 bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-primary hover:shadow-lg hover:brightness-110 active:scale-95"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-500 ease-out animate-in zoom-in-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-primary-dark">Confirm Deletion</h2>
              <button
                onClick={closeDeleteModal}
                className="text-gray-500 hover:text-primary-dark transition-all duration-200 hover:scale-110 active:scale-90"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this ticket handler?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-300 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={() => handlerToDelete && deleteHandler(handlerToDelete)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-4 font-semibold rounded-tl-xl text-center">ID</th>
              <th className="p-4 text-center font-semibold">Name</th>
              <th className="p-4 text-center font-semibold">Email</th>
              <th className="p-4 text-center font-semibold rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {handlers.map((handler: any, index: number) => (
              <tr
                key={handler.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-in-out`}
              >
                <td className="p-4 text-center">{handler.id}</td>
                <td className="p-4 text-center">{handler.name}</td>
                <td className="p-4 text-center">{handler.email}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => openDeleteModal(handler.id)}
                    className="px-4 py-2 bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-primary hover:shadow-lg hover:brightness-110 active:scale-95"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTicketHandler;