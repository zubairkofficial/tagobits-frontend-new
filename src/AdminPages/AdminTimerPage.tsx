import React, { useState, useEffect } from 'react';
import { FaSave, FaUndo, FaClock } from 'react-icons/fa';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';

interface AppTimerData {
  id: number;
  launch_date: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  data: AppTimerData;
  detail?: string;
  knowledge_base?: string;
  knowledge_base_error?: string;
}

const AdminTimerPage: React.FC = () => {
  const [launchDate, setLaunchDate] = useState<string>('');
  const [originalLaunchDate, setOriginalLaunchDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    fetchTimer();
  }, []);

  const fetchTimer = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>('/app-timer');
      if (response.data.success) {
        const date = new Date(response.data.data.launch_date);
        const formattedDate = date.toISOString().slice(0, 16); // Format for datetime-local input
        setLaunchDate(formattedDate);
        setOriginalLaunchDate(formattedDate);
        
        // Format the updated_at date
        const updatedDate = new Date(response.data.data.updated_at);
        setLastUpdated(updatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }));
      } else {
        setError('Failed to load App Timer');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        // Timer not found - show a message and allow creation
        setError('No App Timer found. You can create a new one.');
        setOriginalLaunchDate('');
      } else {
        setError('Failed to load App Timer. Please try again later.');
        console.error('Error fetching app timer:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!launchDate.trim()) {
      toast.error('Launch date cannot be empty');
      return;
    }

    try {
      setSaving(true);
      
      // If originalLaunchDate is empty, it means we're creating a new timer
      const isCreating = originalLaunchDate === '';
      
      const endpoint = '/app-timer';
      const method = isCreating ? 'post' : 'put';
      
      const response = await axiosInstance[method]<ApiResponse>(endpoint, {
        launch_date: new Date(launchDate).toISOString()
      });

      if (response.data.success) {
        // Show success message with knowledge base status
        let successMessage = isCreating ? 'App Timer created successfully' : 'App Timer updated successfully';
        
        if (response.data.knowledge_base === 'updated') {
          successMessage += ' (Knowledge base updated)';
        } else if (response.data.knowledge_base === 'not_updated') {
          successMessage += ' (Knowledge base not updated)';
          if (response.data.knowledge_base_error) {
            console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
          }
        }
        
        toast.success(successMessage);
        setOriginalLaunchDate(launchDate);
        setError(null);
        
        // Update last updated date
        const updatedDate = new Date(response.data.data.updated_at);
        setLastUpdated(updatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }));
      } else {
        toast.error(response.data.detail || 'Failed to update App Timer');
      }
    } catch (err: any) {
      console.error('Error updating app timer:', err);
      toast.error(err.response?.data?.detail || 'An error occurred while updating App Timer');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalLaunchDate === '') {
      // If we were creating new timer, reset to empty
      setLaunchDate('');
    } else {
      // Otherwise reset to the original date
      setLaunchDate(originalLaunchDate);
    }
    toast.success('Changes discarded');
  };

  const hasChanges = originalLaunchDate !== launchDate;
  const isNewTimer = originalLaunchDate === '';

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isNewTimer ? 'Create App Timer' : 'Manage App Timer'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={!hasChanges || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              hasChanges
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaUndo /> Discard Changes
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              hasChanges && !saving
                ? 'bg-gradient-to-r from-[#1952A8] to-primary-dark text-white hover:opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {saving ? (
              <>
                <span className="loader" style={{ width: '16px', height: '16px' }}></span>
                {isNewTimer ? 'Creating...' : 'Saving...'}
              </>
            ) : (
              <>
                <FaSave /> {isNewTimer ? 'Create Timer' : 'Save Changes'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && !isNewTimer ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
          <button 
            onClick={fetchTimer} 
            className="ml-2 text-red-700 hover:text-red-900 underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {isNewTimer ? 'Create New App Timer' : 'Edit App Timer'}
            </h2>
            {!isNewTimer && (
              <span className="text-sm text-gray-500">Last Updated: {lastUpdated}</span>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded mb-6 text-sm text-gray-600">
            <p className="font-semibold mb-1">App Timer Information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>This date will be used for the countdown timer on the Download App page</li>
              <li>The countdown will show days, hours, minutes, and seconds until this date</li>
              <li>Changes won't be saved until you click "{isNewTimer ? 'Create Timer' : 'Save Changes'}"</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="launchDate" className="block text-sm font-medium text-gray-700 mb-2">
                App Launch Date & Time
              </label>
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  id="launchDate"
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  placeholder="Select launch date and time"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                This will be the target date for the countdown timer on the mobile app download page.
              </p>
            </div>

            {launchDate && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
                <p className="text-sm text-gray-600">
                  Selected date: <span className="font-medium">{new Date(launchDate).toLocaleString()}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Time until launch: <span className="font-medium">
                    {(() => {
                      const now = new Date();
                      const target = new Date(launchDate);
                      const diff = target.getTime() - now.getTime();
                      
                      if (diff <= 0) {
                        return 'Launch date has passed';
                      }
                      
                      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                      const minutes = Math.floor((diff / (1000 * 60)) % 60);
                      
                      return `${days} days, ${hours} hours, ${minutes} minutes`;
                    })()}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTimerPage;
