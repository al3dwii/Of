"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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

interface Slide {
  id: string;
  presentation_id: string;
  slide_number: number;
  title: string;
  content: string;
  notes: string | null;
  layout_type: string;
  background_color: string | null;
  text_color: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface Deck {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

interface DeckPresentation {
  id: string;
  deck_id: string;
  presentation_id: string;
  order_index: number;
  created_at: string;
}

interface PresentationShare {
  id: string;
  presentation_id: string;
  shared_by_user_id: string;
  shared_with_user_id: string;
  permission_level: string;
  created_at: string;
}

interface ApiKey {
  id: string;
  user_id: string;
  key_name: string;
  key_hash: string;
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
  revoked_at: string | null;
}

interface DatabaseStatus {
  database: string;
  tables: {
    users: number;
    presentations: number;
    slides: number;
    credit_transactions: number;
    decks: number;
    deck_presentations: number;
    presentation_shares: number;
    api_keys: number;
  };
  total_records: number;
}

type TableName = "users" | "transactions" | "presentations" | "slides" | "decks" | "deck_presentations" | "presentation_shares" | "api_keys" | "overview";

export default function DatabaseViewer() {
  const [activeTab, setActiveTab] = useState<TableName>("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [deckPresentations, setDeckPresentations] = useState<DeckPresentation[]>([]);
  const [presentationShares, setPresentationShares] = useState<PresentationShare[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [databaseStatus, setDatabaseStatus] = useState<DatabaseStatus | null>(null);
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
      if (activeTab === "overview") {
        // Fetch metrics from admin API
        const response = await fetch(`${API_BASE}/api/admin/metrics`);
        if (!response.ok) throw new Error("Failed to fetch database status");
        const data = await response.json();
        // Transform metrics to database status format
        setDatabaseStatus({
          database: "neondb",
          tables: {
            users: data.total_users || 0,
            presentations: data.total_presentations || 0,
            slides: 0,
            credit_transactions: 0,
            decks: 0,
            deck_presentations: 0,
            presentation_shares: 0,
            api_keys: 0,
          },
          total_records: (data.total_users || 0) + (data.total_presentations || 0)
        });
      } else if (activeTab === "users") {
        // Fetch all users from admin endpoint
        const response = await fetch(`${API_BASE}/api/admin/users`);
        if (!response.ok) {
          // Fallback to getting default user from credits
          const creditsResponse = await fetch(`${API_BASE}/api/credits`);
          if (!creditsResponse.ok) throw new Error("Failed to fetch users");
          const data = await creditsResponse.json();
          setUsers([
            {
              id: data.user_id,
              email: "default@example.com",
              name: "Default User",
              credits: data.credits,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: data.last_activity,
            },
          ]);
        } else {
          const data = await response.json();
          setUsers(data.users || []);
        }
      } else if (activeTab === "transactions") {
        const response = await fetch(`${API_BASE}/api/credits/transactions?limit=100`);
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data.transactions || []);
      } else if (activeTab === "presentations") {
        const response = await fetch(`${API_BASE}/api/presentations/list?limit=100`);
        if (!response.ok) throw new Error("Failed to fetch presentations");
        const data = await response.json();
        setPresentations(data.presentations || []);
      } else if (activeTab === "slides") {
        const response = await fetch(`${API_BASE}/api/admin/slides?limit=100`);
        if (!response.ok) throw new Error("Failed to fetch slides");
        const data = await response.json();
        setSlides(data.slides || []);
      } else if (activeTab === "decks") {
        const response = await fetch(`${API_BASE}/api/admin/decks?limit=100`);
        if (!response.ok) throw new Error("Failed to fetch decks");
        const data = await response.json();
        setDecks(data.decks || []);
      } else if (activeTab === "deck_presentations") {
        const response = await fetch(`${API_BASE}/api/admin/deck-presentations?limit=100`);
        if (!response.ok) throw new Error("Failed to fetch deck presentations");
        const data = await response.json();
        setDeckPresentations(data.deck_presentations || []);
      } else if (activeTab === "presentation_shares") {
        const response = await fetch(`${API_BASE}/api/admin/presentation-shares?limit=100`);
        if (!response.ok) throw new Error("Failed to fetch presentation shares");
        const data = await response.json();
        setPresentationShares(data.presentation_shares || []);
      } else if (activeTab === "api_keys") {
        const response = await fetch(`${API_BASE}/api/admin/api-keys?limit=100`);
        if (!response.ok) throw new Error("Failed to fetch API keys");
        const data = await response.json();
        setApiKeys(data.api_keys || []);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
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
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "overview"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "users"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            👤 Users
          </button>
          <button
            onClick={() => setActiveTab("presentations")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "presentations"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            📄 Presentations
          </button>
          <button
            onClick={() => setActiveTab("slides")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "slides"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            🎞️ Slides
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "transactions"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            💳 Credits
          </button>
          <button
            onClick={() => setActiveTab("decks")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "decks"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            📚 Decks
          </button>
          <button
            onClick={() => setActiveTab("deck_presentations")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "deck_presentations"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            🔗 Links
          </button>
          <button
            onClick={() => setActiveTab("presentation_shares")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "presentation_shares"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            🤝 Shares
          </button>
          <button
            onClick={() => setActiveTab("api_keys")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "api_keys"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            🔑 API Keys
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

        {/* Overview Tab */}
        {!loading && activeTab === "overview" && databaseStatus && (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-green-300 font-medium">✅ Database Connected</p>
                  <p className="text-green-400/80 text-sm">
                    Status: {databaseStatus?.database || 'connecting'} | Total Records: {databaseStatus?.total_records || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Table Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setActiveTab("users")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">👤</span>
                  <span className="text-2xl font-bold text-purple-400">{databaseStatus?.tables?.users || 0}</span>
                </div>
                <h3 className="text-white font-medium">Users</h3>
                <p className="text-gray-400 text-sm">Registered accounts</p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setActiveTab("presentations")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">📄</span>
                  <span className="text-2xl font-bold text-blue-400">{databaseStatus?.tables?.presentations || 0}</span>
                </div>
                <h3 className="text-white font-medium">Presentations</h3>
                <p className="text-gray-400 text-sm">Generated decks</p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setActiveTab("slides")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">🎞️</span>
                  <span className="text-2xl font-bold text-green-400">{databaseStatus?.tables?.slides || 0}</span>
                </div>
                <h3 className="text-white font-medium">Slides</h3>
                <p className="text-gray-400 text-sm">Individual slides</p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setActiveTab("transactions")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">💳</span>
                  <span className="text-2xl font-bold text-yellow-400">{databaseStatus?.tables?.credit_transactions || 0}</span>
                </div>
                <h3 className="text-white font-medium">Transactions</h3>
                <p className="text-gray-400 text-sm">Credit history</p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setActiveTab("decks")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">📚</span>
                  <span className="text-2xl font-bold text-indigo-400">{databaseStatus?.tables?.decks || 0}</span>
                </div>
                <h3 className="text-white font-medium">Decks</h3>
                <p className="text-gray-400 text-sm">Collections</p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setActiveTab("deck_presentations")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">🔗</span>
                  <span className="text-2xl font-bold text-cyan-400">{databaseStatus?.tables?.deck_presentations || 0}</span>
                </div>
                <h3 className="text-white font-medium">Deck Links</h3>
                <p className="text-gray-400 text-sm">Presentation mappings</p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setActiveTab("presentation_shares")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">🤝</span>
                  <span className="text-2xl font-bold text-pink-400">{databaseStatus?.tables?.presentation_shares || 0}</span>
                </div>
                <h3 className="text-white font-medium">Shares</h3>
                <p className="text-gray-400 text-sm">Shared presentations</p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setActiveTab("api_keys")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">🔑</span>
                  <span className="text-2xl font-bold text-orange-400">{databaseStatus?.tables?.api_keys || 0}</span>
                </div>
                <h3 className="text-white font-medium">API Keys</h3>
                <p className="text-gray-400 text-sm">Authentication keys</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-white font-medium mb-4">🚀 Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => fetchData()}
                  className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Stats
                </button>
                <button
                  onClick={() => window.location.href = '/test-agentic'}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Presentation
                </button>
                <button
                  onClick={() => setActiveTab("presentations")}
                  className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View All Presentations
                </button>
              </div>
            </div>
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
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Credits
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
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr 
                        key={user.id} 
                        onClick={() => window.location.href = `/admin/users/${user.id}`}
                        className="hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{user.name || 'N/A'}</div>
                          <div className="text-xs text-gray-400">ID: {user.id.slice(0, 8)}...</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-yellow-400">
                            {user.credits.toLocaleString()}
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

        {/* Slides Table */}
        {!loading && activeTab === "slides" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Slide #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Presentation ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Layout
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {slides.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        No slides found
                      </td>
                    </tr>
                  ) : (
                    slides.map((slide) => (
                      <tr key={slide.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-yellow-400">
                            #{slide.slide_number}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white max-w-xs truncate">
                            {slide.title}
                          </div>
                          {slide.content && (
                            <div className="text-xs text-gray-400 max-w-xs truncate mt-1">
                              {slide.content.substring(0, 100)}...
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {slide.presentation_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                            {slide.layout_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(slide.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Decks Table */}
        {!loading && activeTab === "decks" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Public
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {decks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        No decks found
                      </td>
                    </tr>
                  ) : (
                    decks.map((deck) => (
                      <tr key={deck.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white">
                            {deck.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 max-w-xs truncate">
                            {deck.description || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {deck.user_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              deck.is_public
                                ? "bg-green-500/20 text-green-300"
                                : "bg-gray-500/20 text-gray-300"
                            }`}
                          >
                            {deck.is_public ? "Public" : "Private"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(deck.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Deck Presentations Table */}
        {!loading && activeTab === "deck_presentations" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Deck ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Presentation ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {deckPresentations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                        No deck presentations found
                      </td>
                    </tr>
                  ) : (
                    deckPresentations.map((dp) => (
                      <tr key={dp.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {dp.deck_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {dp.presentation_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-blue-400">
                            #{dp.order_index}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(dp.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Presentation Shares Table */}
        {!loading && activeTab === "presentation_shares" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Presentation ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Shared By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Shared With
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Permission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {presentationShares.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        No presentation shares found
                      </td>
                    </tr>
                  ) : (
                    presentationShares.map((share) => (
                      <tr key={share.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {share.presentation_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {share.shared_by_user_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {share.shared_with_user_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full">
                            {share.permission_level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(share.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* API Keys Table */}
        {!loading && activeTab === "api_keys" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Last Used
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Revoked
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {apiKeys.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                        No API keys found
                      </td>
                    </tr>
                  ) : (
                    apiKeys.map((key) => (
                      <tr key={key.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white">
                            {key.key_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {key.user_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              key.is_active
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {key.is_active ? "Active" : "Revoked"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(key.last_used_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(key.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(key.revoked_at)}
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
        {!loading && activeTab !== "overview" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
              <div className="text-sm text-gray-400 mb-1">Current Table</div>
              <div className="text-2xl font-bold text-white capitalize">
                {activeTab === "deck_presentations" ? "Deck Links" : 
                 activeTab === "presentation_shares" ? "Shares" :
                 activeTab === "api_keys" ? "API Keys" :
                 activeTab}
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
              <div className="text-sm text-gray-400 mb-1">Rows Loaded</div>
              <div className="text-2xl font-bold text-white">
                {activeTab === "users" ? users.length :
                 activeTab === "transactions" ? transactions.length :
                 activeTab === "presentations" ? presentations.length :
                 activeTab === "slides" ? slides.length :
                 activeTab === "decks" ? decks.length :
                 activeTab === "deck_presentations" ? deckPresentations.length :
                 activeTab === "presentation_shares" ? presentationShares.length :
                 activeTab === "api_keys" ? apiKeys.length : 0}
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
              <div className="text-sm text-gray-400 mb-1">Total Database Records</div>
              <div className="text-2xl font-bold text-white">
                {databaseStatus?.total_records || 0}
              </div>
            </div>
          </div>
        )}

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
