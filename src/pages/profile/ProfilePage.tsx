import React from 'react';

const ProfilePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Security Settings</h2>
            <div className="space-y-2">
              <button className="text-blue-600 hover:text-blue-800">
                Change Password
              </button>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  <span className="ml-2">Enable two-factor authentication</span>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Preferences</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <span className="ml-2">Receive email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <span className="ml-2">Subscribe to newsletter</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;