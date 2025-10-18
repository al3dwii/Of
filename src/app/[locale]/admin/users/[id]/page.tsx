"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface UserDetail {
  id: string;
  email: string;
  name: string;
  credits: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  presentations_count: number;
  presentations: Presentation[];
}

interface Presentation {
  id: string;
  title: string;
  description: string | null;
  html_url: string | null;
  created_at: string;
  updated_at: string;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    email: "",
    name: "",
    credits: 0,
    is_active: true,
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/admin/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }
      const data = await response.json();
      setUser(data);
      setEditForm({
        email: data.email,
        name: data.name || "",
        credits: data.credits,
        is_active: data.is_active,
      });
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update user");
      }

      const data = await response.json();
      
      // Refresh user details
      await fetchUserDetails();
      setEditing(false);
      
      // Show success message
      alert(data.message || "User updated successfully!");
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete ${user?.email}? This action cannot be undone and will delete all associated presentations.`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete user");
      }

      const data = await response.json();
      alert(data.message || "User deleted successfully!");
      router.push("/database");
    } catch (err: any) {
      console.error("Delete error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-8 max-w-md">
          <p className="text-red-400 text-lg">❌ {error}</p>
          <Link
            href="/database"
            className="mt-4 inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            ← Back to Database
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                👤 User Details
              </h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <Link
              href="/database"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              ← Back to Database
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">❌ {error}</p>
          </div>
        )}

        {/* User Info Card */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">User Information</h2>
            <div className="flex gap-3">
              {!editing ? (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete User
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setEditForm({
                        email: user.email,
                        name: user.name || "",
                        credits: user.credits,
                        is_active: user.is_active,
                      });
                    }}
                    disabled={saving}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              {editing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              ) : (
                <p className="text-white text-lg">{user.email}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter name"
                />
              ) : (
                <p className="text-white text-lg">{user.name || "N/A"}</p>
              )}
            </div>

            {/* Credits */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Credits
              </label>
              {editing ? (
                <input
                  type="number"
                  value={editForm.credits}
                  onChange={(e) => setEditForm({ ...editForm, credits: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              ) : (
                <p className="text-yellow-400 text-2xl font-bold">{user.credits.toLocaleString()}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              {editing ? (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.is_active}
                    onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                    className="w-5 h-5 rounded bg-black/30 border border-white/10 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-white">Active</span>
                </label>
              ) : (
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                    user.is_active
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {user.is_active ? "✅ Active" : "❌ Inactive"}
                </span>
              )}
            </div>

            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                User ID
              </label>
              <p className="text-gray-300 font-mono text-sm">{user.id}</p>
            </div>

            {/* Created At */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Created At
              </label>
              <p className="text-gray-300">{formatDate(user.created_at)}</p>
            </div>

            {/* Updated At */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Last Updated
              </label>
              <p className="text-gray-300">{formatDate(user.updated_at)}</p>
            </div>

            {/* Presentations Count */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Total Presentations
              </label>
              <p className="text-blue-400 text-2xl font-bold">{user.presentations_count}</p>
            </div>
          </div>
        </div>

        {/* Presentations Section */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">📄 Presentations</h2>

          {user.presentations.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No presentations yet</p>
              <p className="text-sm mt-2">This user hasn't created any presentations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {user.presentations.map((presentation) => (
                <div
                  key={presentation.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {presentation.title}
                      </h3>
                      {presentation.description && (
                        <p className="text-gray-400 text-sm mb-2">
                          {presentation.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>ID: {presentation.id.slice(0, 8)}...</span>
                        <span>Created: {formatDate(presentation.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {presentation.html_url && (
                        <a
                          href={presentation.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
                        >
                          View
                        </a>
                      )}
                      <button
                        onClick={() => {
                          localStorage.setItem('editorJobId', presentation.id);
                          router.push('/editor');
                        }}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Section (Placeholder) */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 mt-6">
          <h2 className="text-2xl font-bold text-white mb-6">📊 Activity</h2>
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Activity tracking coming soon</p>
            <p className="text-sm mt-2">User activity logs and analytics will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
