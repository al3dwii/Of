'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/adminApi';
import {
  Users as UsersIcon,
  Search,
  UserX,
  UserCheck,
  Trash2,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Filter,
  Download,
} from 'lucide-react';
import type { User } from '@/types/admin';

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data: UsersResponse = await adminApi.listUsers(page, limit, debouncedSearch || undefined);
      
      // Apply filter
      let filteredUsers = data.users;
      if (filterActive === 'active') {
        filteredUsers = data.users.filter(u => u.is_active);
      } else if (filterActive === 'inactive') {
        filteredUsers = data.users.filter(u => !u.is_active);
      }
      
      setUsers(filteredUsers);
      setTotal(data.total);
      setTotalPages(data.pages);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch, filterActive]);

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length && users.length > 0) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u.id)));
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

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate' | 'delete', userName: string) => {
    const confirmMessage = action === 'delete' 
      ? `Are you sure you want to delete ${userName}? This action cannot be undone.`
      : `Are you sure you want to ${action} ${userName}?`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    setActionLoading(`${userId}-${action}`);
    setError('');
    setSuccess('');
    
    try {
      await adminApi.userAction(userId, action);
      setSuccess(`Successfully ${action}d user: ${userName}`);
      
      // Refresh users list
      await fetchUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || `Failed to ${action} user`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkAction = async (action: 'suspend' | 'activate' | 'delete') => {
    if (selectedUsers.size === 0) return;
    
    const confirmMessage = action === 'delete'
      ? `Are you sure you want to delete ${selectedUsers.size} users? This action cannot be undone.`
      : `Are you sure you want to ${action} ${selectedUsers.size} users?`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Execute actions sequentially
      for (const userId of Array.from(selectedUsers)) {
        await adminApi.userAction(userId, action);
      }
      
      setSuccess(`Successfully ${action}d ${selectedUsers.size} users`);
      setSelectedUsers(new Set());
      await fetchUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || `Failed to ${action} users`);
    } finally {
      setLoading(false);
    }
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
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
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Success</h3>
            <p className="mt-1 text-sm text-green-700">{success}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
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

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as any)}
              className="block px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Users</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.size > 0 && (
          <div className="mt-4 flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg p-3">
            <span className="text-sm font-medium text-indigo-900">
              {selectedUsers.size} user{selectedUsers.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('activate')}
                disabled={loading}
                className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 disabled:opacity-50"
              >
                <UserCheck className="h-4 w-4 inline mr-1" />
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('suspend')}
                disabled={loading}
                className="px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 disabled:opacity-50"
              >
                <UserX className="h-4 w-4 inline mr-1" />
                Suspend
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                disabled={loading}
                className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4 inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{total}</p>
            <p className="text-xs text-gray-500">Total Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.is_active).length}
            </p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {users.filter(u => !u.is_active).length}
            </p>
            <p className="text-xs text-gray-500">Inactive</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : users.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.size === users.length && users.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
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
                              {user.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.full_name || user.username}
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
                        <div className="text-sm text-gray-900 font-medium">{user.credits?.toLocaleString() || 0}</div>
                        <div className="text-xs text-gray-500">{user.total_presentations || 0} presentations</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTierColor(user.subscription_tier)}`}>
                          {user.subscription_tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${
                            user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.is_active ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {user.is_active ? (
                            <button
                              onClick={() => handleUserAction(user.id, 'suspend', user.email)}
                              disabled={actionLoading === `${user.id}-suspend`}
                              className="text-yellow-600 hover:text-yellow-900 disabled:opacity-50"
                              title="Suspend user"
                            >
                              <UserX className={`h-5 w-5 ${actionLoading === `${user.id}-suspend` ? 'animate-spin' : ''}`} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(user.id, 'activate', user.email)}
                              disabled={actionLoading === `${user.id}-activate`}
                              className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              title="Activate user"
                            >
                              <UserCheck className={`h-5 w-5 ${actionLoading === `${user.id}-activate` ? 'animate-spin' : ''}`} />
                            </button>
                          )}
                          <button
                            onClick={() => handleUserAction(user.id, 'delete', user.email)}
                            disabled={actionLoading === `${user.id}-delete` || user.is_admin}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            title={user.is_admin ? 'Cannot delete admin' : 'Delete user'}
                          >
                            <Trash2 className={`h-5 w-5 ${actionLoading === `${user.id}-delete` ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(page * limit, total)}</span> of{' '}
                    <span className="font-medium">{total}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No users in the system yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
