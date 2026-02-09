import React, { useState, useEffect } from 'react';
import { countries } from 'countries-list';
import axiosInstance from '../helper/axios';

const AdminTagoBridgeCountries = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});
  const [prohibitedActivities, setProhibitedActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: '', callback: null });
  const countriesPerPage = 20;

  // Fetch HIFI data from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get('/hifi-countries');
        const data = res.data;
        const map = {};
        ['supported', 'restricted', 'prohibited', 'high-risk'].forEach(cat => {
          data[cat].forEach(c => {
            if (c.code) map[c.code] = cat;
          });
        });
        setCategoryMap(map);
        setProhibitedActivities(data.prohibitedActivities || []);
      } catch (error) {
        console.error('Error fetching HIFI data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Load all countries from countries-list
    const countryList = Object.entries(countries).map(([code, c]) => ({ code, name: c.name }));
    setAllCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  // Initialize selectedCategories based on categoryMap
  useEffect(() => {
    if (Object.keys(categoryMap).length > 0) {
      const initialSelected = {};
      allCountries.forEach(({ code }) => {
        initialSelected[code] = categoryMap[code] || 'none';
      });
      setSelectedCategories(initialSelected);
    }
  }, [categoryMap, allCountries]);

  // Function to show modal
  const openModal = (title, message, type = 'success', callback = null) => {
    setModalContent({ title, message, type, callback });
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setModalContent({ title: '', message: '', type: '', callback: null });
  };

  // Handle category update for a country
  const handleCategoryChange = async (code, name, newCategory) => {
    setLoading(true);
    setError(null);
    try {
      if (newCategory === 'none') {
        await axiosInstance.post('/hifi-countries/remove-country', { code });
      } else {
        await axiosInstance.post('/hifi-countries/add-country', { name, code, category: newCategory });
      }
      // Refresh data after update
      const res = await axiosInstance.get('/hifi-countries');
      const data = res.data;
      const map = {};
      ['supported', 'restricted', 'prohibited', 'high-risk'].forEach(cat => {
        data[cat].forEach(c => {
          if (c.code) map[c.code] = cat;
        });
      });
      setCategoryMap(map);
      // Update selectedCategories to match new categoryMap
      const updatedSelected = { ...selectedCategories };
      updatedSelected[code] = newCategory === 'none' ? 'none' : newCategory;
      setSelectedCategories(updatedSelected);
      openModal('Success', 'Country category updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating category:', error);
      openModal('Error', 'Failed to update category.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Add new prohibited activity
  const addActivity = async () => {
    if (!newActivity) return;
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/hifi-countries/add-activity', { activity: newActivity });
      const res = await axiosInstance.get('/hifi-countries');
      setProhibitedActivities(res.data.prohibitedActivities || []);
      setNewActivity('');
      openModal('Success', 'Activity added successfully!', 'success');
    } catch (error) {
      console.error('Error adding activity:', error);
      openModal('Error', 'Failed to add activity.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Remove prohibited activity
  const removeActivity = (activity) => {
    openModal(
      'Confirm Deletion',
      `Are you sure you want to delete the activity "${activity}"?`,
      'confirm',
      async () => {
        setLoading(true);
        setError(null);
        try {
          await axiosInstance.delete('/hifi-countries/remove-activity', { data: { activity } });
          const res = await axiosInstance.get('/hifi-countries');
          setProhibitedActivities(res.data.prohibitedActivities || []);
          openModal('Success', 'Activity deleted successfully!', 'success');
        } catch (error) {
          console.error('Error deleting activity:', error);
          openModal('Error', 'Failed to delete activity.', 'error');
        } finally {
          setLoading(false);
        }
      }
    );
  };

  // Filtered and paginated countries
  const filteredCountries = allCountries.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const paginatedCountries = filteredCountries.slice(currentPage * countriesPerPage, (currentPage + 1) * countriesPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-primary-dark">
        TagoBridge Countries Manager
      </h1>

      {error && <div className="text-red-600 font-medium mb-4">{error}</div>}
      {loading && <div className="text-gray-600 mb-4 animate-pulse">Loading...</div>}

      {/* Modal for Confirmations, Success, and Errors */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-500 ease-out animate-in zoom-in-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-primary-dark">{modalContent.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-primary-dark transition-all duration-200 hover:scale-110 active:scale-90"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-6">{modalContent.message}</p>
            <div className="flex justify-end gap-4">
              {modalContent.type === 'confirm' ? (
                <>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-300 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      modalContent.callback();
                      closeModal();
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg transition-all duration-200 hover:bg-red-700 active:scale-95"
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-primary-dark text-white rounded-lg transition-all duration-200 hover:bg-primary active:scale-95"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Countries Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Manage Countries</h2>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-primary-dark transition duration-200"
        />
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Country</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCountries.map(({ code, name }) => {
                const currentCategory = categoryMap[code] || 'none';
                const selectedCategory = selectedCategories[code] || 'none';
                const isChanged = selectedCategory !== currentCategory;

                return (
                  <tr key={code} className="border-b">
                    <td className="p-3">{name}</td>
                    <td className="p-3">{code}</td>
                    <td className="p-3">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategories(prev => ({ ...prev, [code]: e.target.value }))}
                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-dark"
                        disabled={loading}
                      >
                        <option value="none">None</option>
                        <option value="supported">Supported</option>
                        <option value="restricted">Restricted</option>
                        <option value="prohibited">Prohibited</option>
                        <option value="high-risk">High-Risk</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleCategoryChange(code, name, selectedCategory)}
                        disabled={!isChanged || loading}
                        className={`px-4 py-1 rounded-md transition duration-300 ${isChanged ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Prohibited Activities Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Manage Prohibited Activities</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="New activity..."
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mr-2 focus:ring-2 focus:ring-primary-dark transition duration-200"
          />
          <button
            onClick={addActivity}
            className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary transition duration-300 disabled:opacity-50"
            disabled={loading || !newActivity}
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-5">
          {prohibitedActivities.map((activity, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              {activity}
              <button
                onClick={() => removeActivity(activity)}
                className="ml-2 text-red-600 hover:text-red-800"
                disabled={loading}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminTagoBridgeCountries;