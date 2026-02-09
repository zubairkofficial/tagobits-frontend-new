import React, { useEffect, useState } from 'react';
import axiosInstance from '../helper/axios';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdFirstPage, MdLastPage } from "react-icons/md";
import { FiMessageCircle, FiX, FiUser, FiMail, FiPhone, FiCalendar, FiEye } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import { FcRefresh } from 'react-icons/fc';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  message: string;
  is_wallet_created: boolean;
  created_at: string;
  updated_at: string;
}

const AdminCustomerCarePage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts();
    }, 300); // Small delay to ensure auth is initialized
    console.log("Hello World")
    return () => clearTimeout(timer);
  }, [retryCount]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/contacts');
      
      if (response.data) {
        setContacts(response.data);
      } else {
        throw new Error('No data received from server');
      }
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      
      let errorMessage = 'Error fetching contacts data';
      
      // Check for specific error types
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Authentication error. Please try refreshing the page.';
        } else if (error.response.status === 403) {
          errorMessage = 'You do not have permission to access contacts.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const retryFetchContacts = () => {
    setRetryCount(prev => prev + 1);
  };

  const openContactModal = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="p-6 bg-red-50 text-red-800 rounded-lg border border-red-200 mx-auto max-w-4xl mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-red-100 p-1.5 rounded-full">
            <FiMessageCircle className="text-red-600" />
          </span>
          Error
        </h2>
        <p className="mt-2">{error}</p>
        <button 
          onClick={retryFetchContacts}
          className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
        >
          <FcRefresh className="text-red-600" /> Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-gray-50 min-h-screen p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-2xl font-bold text-primary-dark">
              Contact Messages
            </h1>
            <p className="text-gray-500">View and manage contact form submissions</p>
          </motion.div>
          
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={retryFetchContacts}
              className="px-4 py-2 rounded-lg flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
            >
              <FcRefresh /> Refresh
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="bg-white shadow-sm rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-800">All Contact Messages</h3>
                <p className="text-sm text-gray-500">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, contacts.length)} of {contacts.length} contacts</p>
              </div>
              <button 
                onClick={() => fetchContacts()}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-600 transition-colors"
              >
                <FcRefresh />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Has Wallet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-primary-dark rounded-full flex items-center justify-center text-white">
                            {contact.first_name.charAt(0)}{contact.last_name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-primary-dark">
                              {contact.first_name} {contact.last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          contact.is_wallet_created ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {contact.is_wallet_created ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(contact.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <motion.button
                          onClick={() => openContactModal(contact)}
                          className="text-primary hover:text-primary-dark bg-blue-50 hover:bg-blue-100 transition-colors p-2 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiEye />
                        </motion.button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No contact messages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {contacts.length > 0 && (
            <div className="px-6 py-4 bg-white border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, contacts.length)} of {contacts.length} entries
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => paginate(1)}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-gray-100"
                      aria-label="First page"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdFirstPage size={20} />
                    </motion.button>
                    <motion.button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-gray-100"
                      aria-label="Previous page"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdKeyboardArrowLeft size={20} />
                    </motion.button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }
                        
                        return (
                          <motion.button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${
                              currentPage === pageNumber
                                ? 'bg-primary-dark text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {pageNumber}
                          </motion.button>
                        );
                      })}
                    </div>

                    <motion.button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-gray-100"
                      aria-label="Next page"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdKeyboardArrowRight size={20} />
                    </motion.button>
                    <motion.button
                      onClick={() => paginate(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-gray-100"
                      aria-label="Last page"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdLastPage size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Contact Details Modal */}
      <AnimatePresence>
        {showModal && selectedContact && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-white rounded-xl shadow-lg max-w-2xl w-full overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center border-b border-gray-200 p-5">
                <h3 className="text-xl font-bold text-primary-dark">Contact Message Details</h3>
                <motion.button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX size={24} />
                </motion.button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <FiUser />
                        <span>Full Name</span>
                      </div>
                      <p className="text-lg font-medium">{selectedContact.first_name} {selectedContact.last_name}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <FiMail />
                        <span>Email Address</span>
                      </div>
                      <p className="text-base">{selectedContact.email || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <FiPhone />
                        <span>Phone Number</span>
                      </div>
                      <p className="text-base">{selectedContact.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <FiCalendar />
                        <span>Submitted On</span>
                      </div>
                      <p className="text-base">{formatDate(selectedContact.created_at)}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <FiMessageCircle />
                        <span>Has TagoCash Wallet</span>
                      </div>
                      <p className="text-base">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedContact.is_wallet_created ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedContact.is_wallet_created ? 'Yes' : 'No'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <FiMessageCircle />
                    <span>Message</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-base whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-5 bg-gray-50 flex justify-end">
                <motion.button
                  onClick={closeModal}
                  className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminCustomerCarePage; 