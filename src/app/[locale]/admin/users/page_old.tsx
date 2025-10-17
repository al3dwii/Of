'use client';

import { useState } from 'react';
import { Users as UsersIcon, Search, UserX, UserCheck, Trash2, AlertCircle } from 'lucide-react';

// Temporary: This will be replaced with real API calls
const mockUsers = [
  {
    id: 'b2a2e7a2-e27f-48d7-b7a7-f340337dc460',
    email: 'admin@sharayeh.com',
    username: 'admin',
    full_name: 'Admin User',
    credits: 10000,
    subscription_tier: 'enterprise',
    is_active: true,
    is_admin: true,
    role: 'admin',
    created_at: '2025-07-18T19:32:05',
  },
  {
    id: '1b3917bf-0c86-4d09-ab58-c4abf3fbe2f6',
    email: 'demo@sharayeh.com',
    username: 'demo_user',
    full_name: 'Demo User',
    credits: 5000,
    subscription_tier: 'pro',
    is_active: true,
    is_admin: false,
    role: 'user',
    created_at: '2025-08-17T19:32:05',
  },
  {
    id: '03577fea-0bbf-4fb6-bf6b-a6da69d1adb7',
    email: 'free@sharayeh.com',
    username: 'free_user',
    full_name: 'Free User',
    credits: 1000,
    subscription_tier: 'free',
    is_active: true,
    is_admin: false,
    role: 'user',
    created_at: '2025-09-16T19:32:05',
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
    }
  };

  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate' | 'delete') => {
    setActionLoading(`${userId}-${action}`);
    
    // TODO: Implement actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    alert(`Action "${action}" would be performed on user ${userId}`);
    setActionLoading(null);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise':
        return 'bg-purple-100 text-purple-800';
      case 'pro':
        return 'bg-blue-100 text-blue-800';
      case 'free':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users, permissions, and access control
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by email, username, or name..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {selectedUsers.size > 0 && (
          <div className="mt-4 flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg p-3">
            <span className="text-sm font-medium text-indigo-900">
              {selectedUsers.size} user{selectedUsers.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
              >
                Activate
              </button>
              <button
                className="px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200"
              >
                Suspend
              </button>
              <button
                className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Credits
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tier
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-700 font-medium text-sm">
                          {user.full_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.full_name}
                          {user.is_admin && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.credits.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTierColor(user.subscription_tier)}`}>
                      {user.subscription_tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.is_active ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {user.is_active ? (
                        <button
                          onClick={() => handleUserAction(user.id, 'suspend')}
                          disabled={actionLoading === `${user.id}-suspend`}
                          className="text-yellow-600 hover:text-yellow-900 disabled:opacity-50"
                          title="Suspend user"
                        >
                          <UserX className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserAction(user.id, 'activate')}
                          disabled={actionLoading === `${user.id}-activate`}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          title="Activate user"
                        >
                          <UserCheck className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleUserAction(user.id, 'delete')}
                        disabled={actionLoading === `${user.id}-delete`}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        title="Delete user"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No users in the system yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-blue-800">Note</h3>
          <p className="mt-1 text-sm text-blue-700">
            User actions are currently using mock data. Real API integration will be added next.
          </p>
        </div>
      </div>
    </div>
  );
}
