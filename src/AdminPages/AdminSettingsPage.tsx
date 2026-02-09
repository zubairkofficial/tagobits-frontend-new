import React from 'react';

const AdminSettingsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-800">System Settings</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Tago Cash"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Description
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              defaultValue="Your trusted financial platform"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="support@tagocash.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Mode
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Enable maintenance mode
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default User Role
            </label>
            <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="user">User</option>
              <option value="premium">Premium</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="30"
            />
          </div>
          
          <div className="pt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage; 