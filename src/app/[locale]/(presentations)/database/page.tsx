"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  credits: number;
  total_credits_used: number;
  subscription_tier: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  balance_after: number;
  reason: string;
  transaction_type: string;
  job_id: string | null;
  created_at: string;
}

interface Presentation {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  num_slides: number;
  prompt: string;
  status: string;
  is_public: boolean;
  view_count: number;
  thumbnail_url: string | null;
  pptx_url: string | null;
  artifacts_path: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

type TableName = "users" | "transactions" | "presentations";

export default function DatabaseViewer() {
  const [activeTab, setActiveTab] = useState<TableName>("users");
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  // Fetch data based on active tab
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (activeTab === "users") {
        // For now, we'll get default user info
        const response = await fetch(`${API_BASE}/api/credits`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        
        // Mock user data from credits response
        setUsers([
          {
            id: data.user_id,
            email: "default@example.com",
            username: "default_user",
            full_name: "Default User",
            credits: data.credits,
            total_credits_used: data.total_credits_used,
            subscription_tier: "free",
            is_active: true,
            is_verified: false,
            created_at: new Date().toISOString(),
            updated_at: data.last_activity,
            last_login: null,
          },
        ]);
      } else if (activeTab === "transactions") {
        const response = await fetch(`${API_BASE}/api/credits/transactions?limit=100`);
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data.transactions);
      } else if (activeTab === "presentations") {
        const response = await fetch(`${API_BASE}/api/presentations/list?user_id=default_user&limit=100`);
        if (!response.ok) throw new Error("Failed to fetch presentations");
        const data = await response.json();
        setPresentations(data.presentations || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "done":
        return "text-green-400";
      case "running":
      case "processing":
        return "text-yellow-400";
      case "failed":
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? "text-green-400" : "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                🗄️ Database Viewer
              </h1>
              <p className="text-gray-400">
                Browse and inspect all database tables
              </p>
            </div>
            <Link
              href="/test-agentic"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              ← Back to Generator
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        {activeTab === "presentations" && presentations.length > 0 && (
          <div className="mb-6 bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-blue-300 font-medium mb-1">☁️ Cloud Storage Active</p>
                <p className="text-blue-400/80 text-sm">
                  All presentations are now stored in <span className="font-mono bg-blue-500/20 px-2 py-0.5 rounded">AWS S3 (s3://isharayeh/sharayeh/)</span>
                  {" "}and served directly from the cloud. Click "View" to open the presentation viewer, "Edit" to modify slides, or "ZIP" to download.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-black/20 backdrop-blur-sm rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "users"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            👤 Users
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "transactions"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            💳 Transactions
          </button>
          <button
            onClick={() => setActiveTab("presentations")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "presentations"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            📊 Presentations
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">❌ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Users Table */}
        {!loading && activeTab === "users" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Used
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{user.username}</div>
                          <div className="text-xs text-gray-400">{user.full_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-yellow-400">
                            {user.credits.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-red-400">
                            {user.total_credits_used.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full">
                            {user.subscription_tier}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.is_active
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(user.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        {!loading && activeTab === "transactions" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Balance After
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Job ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(tx.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                            {tx.transaction_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-lg font-bold ${getTransactionColor(
                              tx.amount
                            )}`}
                          >
                            {tx.amount > 0 ? "+" : ""}
                            {tx.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-yellow-400">
                            {tx.balance_after.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {tx.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {tx.job_id ? tx.job_id.slice(0, 8) + "..." : "N/A"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Presentations Table */}
        {!loading && activeTab === "presentations" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Slides
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Public
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {presentations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                        No presentations found. Create your first presentation!
                      </td>
                    </tr>
                  ) : (
                    presentations.map((pres) => (
                      <tr key={pres.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white max-w-xs truncate" title={pres.title}>
                            {pres.title}
                          </div>
                          {pres.description && (
                            <div className="text-xs text-gray-400 max-w-xs truncate" title={pres.description}>
                              {pres.description}
                            </div>
                          )}
                          {pres.prompt && (
                            <div className="text-xs text-purple-400 max-w-xs truncate mt-1" title={pres.prompt}>
                              💬 {pres.prompt}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 font-mono mt-1">
                            ID: {pres.id.slice(0, 8)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-blue-400">
                            {pres.num_slides}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              pres.status
                            )}`}
                          >
                            {pres.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              pres.is_public
                                ? "bg-green-500/20 text-green-300"
                                : "bg-gray-500/20 text-gray-300"
                            }`}
                          >
                            {pres.is_public ? "Public" : "Private"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {pres.view_count || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(pres.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                          <a
                            href={`/view/${pres.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1"
                            title="View presentation (opens in new tab)"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </a>
                          <button
                            onClick={() => {
                              localStorage.setItem('editorJobId', pres.id);
                              window.location.href = '/editor';
                            }}
                            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                            title="Edit in editor"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <a
                            href={`${API_BASE}/api/presentations/${pres.id}/export.zip`}
                            download
                            className="text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
                            title="Download as ZIP"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            ZIP
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
            <div className="text-sm text-gray-400 mb-1">Total Users</div>
            <div className="text-2xl font-bold text-white">{users.length}</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
            <div className="text-sm text-gray-400 mb-1">Total Transactions</div>
            <div className="text-2xl font-bold text-white">
              {transactions.length}
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
            <div className="text-sm text-gray-400 mb-1">Total Presentations</div>
            <div className="text-2xl font-bold text-white">
              {presentations.length}
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
