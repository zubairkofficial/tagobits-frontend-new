import React, { useEffect, useState } from 'react';
import axiosInstance from '../helper/axios';
import { Loader } from '../components/Loader';
import { toast } from 'react-hot-toast';
import { FiUsers, FiRefreshCw, FiSearch, FiCheck, FiX, FiEdit, FiTrash2, FiMail, FiChevronDown, FiSave, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { adminCreateUser } from '../services/authservice';

// Define interfaces
interface User {
  id: number;
  name: string;
  email: string;
  email_verified: boolean;
  role: string;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  data: User[];
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [editingName, setEditingName] = useState<number | null>(null);
  const [editingEmail, setEditingEmail] = useState<number | null>(null);
  const [updatingProfile, setUpdatingProfile] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ [key: number]: { name: string; email: string } }>({});
  
  // Add user modal state
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [addUserForm, setAddUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin' // Changed from 'user' to 'admin'
  });
  const [addUserErrors, setAddUserErrors] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [addingUser, setAddingUser] = useState<boolean>(false);

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get<ApiResponse>('/get-all-users');
      
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      
      let errorMessage = 'Failed to fetch users';
      
      // Check for specific error types
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Authentication error. Please try refreshing the page.';
        } else if (error.response.status === 403) {
          errorMessage = 'You do not have permission to access users data.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const retryFetchUsers = () => {
    setRetryCount(prev => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300); // Small delay to ensure auth is initialized
    
    return () => clearTimeout(timer);
  }, [retryCount]);

  // Handle escape key to close editors
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditingName(null);
        setEditingEmail(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle click outside to close editors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.name-editor') && !target.closest('.email-editor')) {
        setEditingName(null);
        setEditingEmail(null);
      }
    };

    if (editingName !== null || editingEmail !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [editingName, editingEmail]);

  // Handle click outside to close add user modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.add-user-modal')) {
        setShowAddUserModal(false);
        resetAddUserForm();
      }
    };

    if (showAddUserModal) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAddUserModal]);

  // Initialize edit values when editing starts
  const startEditing = (userId: number, field: 'name' | 'email', user: User) => {
    setEditValues(prev => ({
      ...prev,
      [userId]: {
        name: user.name,
        email: user.email
      }
    }));
    if (field === 'name') {
      setEditingName(userId);
    } else {
      setEditingEmail(userId);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (userId: number, field: 'name' | 'email') => {
    const user = users.find(u => u.id === userId);
    if (!user || !editValues[userId]) return;

    const newValue = editValues[userId][field];
    const currentValue = user[field];

    // Don't update if value hasn't changed
    if (newValue === currentValue) {
      setEditingName(null);
      setEditingEmail(null);
      return;
    }

    try {
      setUpdatingProfile(userId);
      
      const payload: any = {};
      payload[field] = newValue;

      const response = await axiosInstance.put(`/update-user-profile/${userId}`, payload);
      
      if (response.data.success) {
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === userId ? { ...u, [field]: newValue } : u
          )
        );
        toast.success(`${field === 'name' ? 'Name' : 'Email'} updated successfully`);
        setEditingName(null);
        setEditingEmail(null);
      } else {
        throw new Error('Failed to update user profile');
      }
    } catch (error: any) {
      console.error('Error updating user profile:', error);
      
      let errorMessage = 'Failed to update user profile';
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'You are not authorized to update user profiles.';
        } else if (error.response.status === 400) {
          errorMessage = error.response.data.detail || 'Invalid data provided.';
        } else if (error.response.status === 404) {
          errorMessage = 'User not found.';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setUpdatingProfile(null);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user status change
  const handleStatusChange = async (userId: number, newStatus: boolean) => {
    try {
      setLoading(true);
      // Add your API endpoint for updating user status
      // const response = await axiosInstance.put(`/update-user-status/${userId}`, { status: newStatus });
      
      // For demo purposes (remove in production)
      setTimeout(() => {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId ? { ...user, email_verified: newStatus } : user
          )
        );
        setLoading(false);
        toast.success('User status updated successfully');
      }, 500);
      
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
      setLoading(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true);
      setShowDeleteModal(false);
      
      // Add your API endpoint for deleting users
      // const response = await axiosInstance.delete(`/delete-user/${userId}`);
      
      // For demo purposes (remove in production)
      setTimeout(() => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setLoading(false);
        toast.success('User deleted successfully');
      }, 500);
      
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
      setLoading(false);
    }
  };

  // Add user validation
  const validateAddUserField = (name: string, value: string) => {
    let errorMsg = "";

    if (name === "name") {
      if (!value.trim()) {
        errorMsg = "Name is required.";
      } else if (value.trim().length < 2) {
        errorMsg = "Name must be at least 2 characters long.";
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        errorMsg = "Email is required.";
      } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
        errorMsg = "Please enter a valid email address.";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        errorMsg = "Password is required.";
      } else if (value.length < 8) {
        errorMsg = "Password must be at least 8 characters long.";
      } else if (!/[A-Z]/.test(value)) {
        errorMsg = "Password must contain at least one uppercase letter.";
      } else if (!/[0-9]/.test(value)) {
        errorMsg = "Password must contain at least one number.";
      }
    }

    setAddUserErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  // Handle add user form changes
  const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddUserForm(prev => ({ ...prev, [name]: value }));
    validateAddUserField(name, value);
  };

  // Check if add user form is valid
  const isAddUserFormValid = () => {
    return (
      addUserForm.name.trim() !== "" &&
      addUserForm.email.trim() !== "" &&
      addUserForm.password.trim() !== "" &&
      addUserForm.role !== "" &&
      !addUserErrors.name &&
      !addUserErrors.email &&
      !addUserErrors.password &&
      !addUserErrors.role
    );
  };

  // Handle add user submission
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    validateAddUserField("name", addUserForm.name);
    validateAddUserField("email", addUserForm.email);
    validateAddUserField("password", addUserForm.password);

    if (!isAddUserFormValid()) return;

    try {
      setAddingUser(true);
      
      const response = await adminCreateUser(
        addUserForm.name,
        addUserForm.email,
        addUserForm.password,
        addUserForm.role
      );

      if (response.success) {
        // Add the new user to the list
        const newUser: User = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          email_verified: response.data.email_verified,
          role: response.data.role,
          created_at: new Date().toISOString()
        };
        
        setUsers(prevUsers => [newUser, ...prevUsers]);
        toast.success(response.detail);
        
        // Reset form and close modal
        setAddUserForm({
          name: '',
          email: '',
          password: '',
          role: 'admin'
        });
        setAddUserErrors({
          name: '',
          email: '',
          password: '',
          role: ''
        });
        setShowPassword(false);
        setShowAddUserModal(false);
      } else {
        toast.error(response.detail || 'Failed to create user');
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.detail || 'Failed to create user');
    } finally {
      setAddingUser(false);
    }
  };

  // Reset add user form
  const resetAddUserForm = () => {
    setAddUserForm({
      name: '',
      email: '',
      password: '',
      role: 'admin'
    });
    setAddUserErrors({
      name: '',
      email: '',
      password: '',
      role: ''
    });
    setShowPassword(false);
  };

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-primary-dark flex items-center">
            <FiUsers className="mr-2" /> Users Management
          </h2>
          <p className="text-gray-500">Manage user accounts and permissions</p>
        </motion.div>
        
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2 transition-colors"
            onClick={() => setShowAddUserModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus /> Add User
          </motion.button>
          <motion.button 
            className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 flex items-center gap-2 transition-colors"
            onClick={retryFetchUsers}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
          </motion.button>
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="text-lg font-medium text-gray-800">
              User List <span className="text-gray-400 text-sm font-normal ml-2">({users.length} total)</span>
            </h3>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Search users..."
              />
            </div>
          </div>
        </div>
        
        {loading && users.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2" role="alert">
              <FiX className="text-red-500" />
              <span>{error}</span>
              <button 
                className="ml-auto bg-red-100 px-3 py-1 rounded-md text-red-700 text-sm hover:bg-red-200 transition-colors"
                onClick={retryFetchUsers}
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                        No users found matching your search criteria
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{user.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingName === user.id ? (
                            <div className="relative name-editor">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  value={editValues[user.id]?.name || ''}
                                  onChange={(e) => setEditValues(prev => ({
                                    ...prev,
                                    [user.id]: { ...prev[user.id], name: e.target.value }
                                  }))}
                                  placeholder={user.name}
                                  disabled={updatingProfile === user.id}
                                />
                                <motion.button
                                  className="text-green-600 hover:text-green-800 transition-colors"
                                  onClick={() => handleProfileUpdate(user.id, 'name')}
                                  disabled={updatingProfile === user.id}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FiSave className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                  onClick={() => setEditingName(null)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FiX className="w-4 h-4" />
                                </motion.button>
                              </div>
                              {updatingProfile === user.id && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded">
                                  <div className="w-4 h-4 border border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <motion.button
                              className="text-sm font-medium text-gray-900 hover:text-primary flex items-center gap-1 group"
                              onClick={() => startEditing(user.id, 'name', user)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {user.name}
                              <FiEdit className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingEmail === user.id ? (
                            <div className="relative email-editor">
                              <div className="flex items-center gap-2">
                                <input
                                  type="email"
                                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  value={editValues[user.id]?.email || ''}
                                  onChange={(e) => setEditValues(prev => ({
                                    ...prev,
                                    [user.id]: { ...prev[user.id], email: e.target.value }
                                  }))}
                                  placeholder={user.email}
                                  disabled={updatingProfile === user.id}
                                />
                                <motion.button
                                  className="text-green-600 hover:text-green-800 transition-colors"
                                  onClick={() => handleProfileUpdate(user.id, 'email')}
                                  disabled={updatingProfile === user.id}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FiSave className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                  onClick={() => setEditingEmail(null)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FiX className="w-4 h-4" />
                                </motion.button>
                              </div>
                              {updatingProfile === user.id && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded">
                                  <div className="w-4 h-4 border border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <motion.button
                              className="text-sm text-gray-500 flex items-center gap-1 group hover:text-primary"
                              onClick={() => startEditing(user.id, 'email', user)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FiMail className="text-gray-400" /> {user.email}
                              <FiEdit className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {users.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-gray-500 text-sm">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <motion.div 
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg my-6 mx-4 add-user-modal"
            initial={{ scale: 0.95 }} 
            animate={{ scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  resetAddUserForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={addUserForm.name}
                  onChange={handleAddUserChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    addUserErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
                {addUserErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{addUserErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={addUserForm.email}
                  onChange={handleAddUserChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    addUserErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email address"
                />
                {addUserErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{addUserErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={addUserForm.password}
                    onChange={handleAddUserChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                      addUserErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {addUserErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{addUserErrors.password}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with 1 uppercase letter and 1 number
                </p>
              </div>

              {/* Role Field - Removed since admins can only create admin users */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">
                    <FiUsers className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-blue-800 font-medium">
                    New user will be created as an Admin
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Admins can only create other admin users
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddUserModal(false);
                    resetAddUserForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isAddUserFormValid() || addingUser}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    isAddUserFormValid() && !addingUser
                      ? 'bg-primary hover:bg-primary-dark cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed'
                  } flex items-center justify-center`}
                >
                  {addingUser ? (
                    <Loader />
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default UsersPage; 