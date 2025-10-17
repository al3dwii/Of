"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

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

interface SystemMetrics {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  active_users: number;
  requests_per_minute: number;
  error_rate: number;
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

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  resource: string;
  ip_address: string;
  user_agent: string;
  timestamp: string;
}

interface SystemSettings {
  maintenance_mode: boolean;
  registration_enabled: boolean;
  max_upload_size: number;
  default_credits: number;
  api_rate_limit: number;
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

type TableName = "users" | "transactions" | "presentations" | "slides" | "decks" | "deck_presentations" | "presentation_shares" | "api_keys" | "overview" | "analytics" | "logs" | "settings";

export default function DatabaseViewer() {
  const { getToken } = useAuth();
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
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSettings | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showAddCreditsModal, setShowAddCreditsModal] = useState(false);
  const [creditsAmount, setCreditsAmount] = useState("");
  const [creditsTargetUser, setCreditsTargetUser] = useState<User | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  // Fetch data based on active tab
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get auth token from Clerk
      const token = await getToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      if (activeTab === "overview") {
        // Fetch database status and system metrics
        const [dbResponse, metricsResponse] = await Promise.all([
          fetch(`${API_BASE}/api/admin/database-status`, { headers }),
          fetch(`${API_BASE}/api/admin/metrics`, { headers }).catch(() => null)
        ]);
        
        if (!dbResponse.ok) throw new Error("Failed to fetch database status");
        const dbData = await dbResponse.json();
        setDatabaseStatus(dbData);

        if (metricsResponse?.ok) {
          const metricsData = await metricsResponse.json();
          setSystemMetrics(metricsData);
        }
      } else if (activeTab === "analytics") {
        // Fetch analytics data
        const metricsResponse = await fetch(`${API_BASE}/api/admin/analytics`, { headers });
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setSystemMetrics(metricsData);
        }
      } else if (activeTab === "logs") {
        // Fetch activity logs
        const logsResponse = await fetch(`${API_BASE}/api/admin/activity-logs?limit=100`, { headers });
        if (logsResponse.ok) {
          const logsData = await logsResponse.json();
          setActivityLogs(logsData.logs || []);
        }
      } else if (activeTab === "settings") {
        // Fetch system settings
        const settingsResponse = await fetch(`${API_BASE}/api/admin/settings`, { headers });
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          setSystemSettings(settingsData);
        }
      } else if (activeTab === "users") {
        // Fetch all users from admin endpoint
        const response = await fetch(`${API_BASE}/api/admin/users`, { headers });
        if (!response.ok) {
          // Fallback to getting default user from credits
          const creditsResponse = await fetch(`${API_BASE}/api/credits`, { headers });
          if (!creditsResponse.ok) throw new Error("Failed to fetch users");
          const data = await creditsResponse.json();
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
        } else {
          const data = await response.json();
          setUsers(data.users || []);
        }
      } else if (activeTab === "transactions") {
        const response = await fetch(`${API_BASE}/api/credits/transactions?limit=100`, { headers });
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data.transactions || []);
      } else if (activeTab === "presentations") {
        const response = await fetch(`${API_BASE}/api/presentations/list?limit=100`, { headers });
        if (!response.ok) throw new Error("Failed to fetch presentations");
        const data = await response.json();
        setPresentations(data.presentations || []);
      } else if (activeTab === "slides") {
        const response = await fetch(`${API_BASE}/api/admin/slides?limit=100`, { headers });
        if (!response.ok) throw new Error("Failed to fetch slides");
        const data = await response.json();
        setSlides(data.slides || []);
      } else if (activeTab === "decks") {
        const response = await fetch(`${API_BASE}/api/admin/decks?limit=100`, { headers });
        if (!response.ok) throw new Error("Failed to fetch decks");
        const data = await response.json();
        setDecks(data.decks || []);
      } else if (activeTab === "deck_presentations") {
        const response = await fetch(`${API_BASE}/api/admin/deck-presentations?limit=100`, { headers });
        if (!response.ok) throw new Error("Failed to fetch deck presentations");
        const data = await response.json();
        setDeckPresentations(data.deck_presentations || []);
      } else if (activeTab === "presentation_shares") {
        const response = await fetch(`${API_BASE}/api/admin/presentation-shares?limit=100`, { headers });
        if (!response.ok) throw new Error("Failed to fetch presentation shares");
        const data = await response.json();
        setPresentationShares(data.presentation_shares || []);
      } else if (activeTab === "api_keys") {
        const response = await fetch(`${API_BASE}/api/admin/api-keys?limit=100`, { headers });
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

  const handleBulkAction = async () => {
    if (!bulkAction || selectedItems.size === 0) return;
    
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE}/api/admin/bulk-action`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          action: bulkAction,
          items: Array.from(selectedItems),
          table: activeTab
        })
      });

      if (response.ok) {
        alert(`Bulk action "${bulkAction}" completed successfully`);
        setSelectedItems(new Set());
        setBulkAction("");
        fetchData();
      } else {
        throw new Error('Bulk action failed');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE}/api/admin/users/${userId}/${action}`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      });

      if (response.ok) {
        alert(`Action "${action}" completed successfully`);
        fetchData();
      } else {
        throw new Error('Action failed');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleAddCredits = async () => {
    if (!creditsTargetUser || !creditsAmount) return;
    
    const amount = parseInt(creditsAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE}/api/admin/users/${creditsTargetUser.id}/add_credits/${amount}`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      });

      if (response.ok) {
        alert(`Successfully added ${amount} credits to ${creditsTargetUser.username}`);
        setShowAddCreditsModal(false);
        setCreditsAmount("");
        setCreditsTargetUser(null);
        setShowUserModal(false);
        fetchData();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add credits');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const openAddCreditsModal = (user: User) => {
    setCreditsTargetUser(user);
    setCreditsAmount("");
    setShowAddCreditsModal(true);
  };

  const handleUpdateSettings = async (newSettings: Partial<SystemSettings>) => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE}/api/admin/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        alert('Settings updated successfully');
        fetchData();
      } else {
        throw new Error('Settings update failed');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const toggleItemSelection = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const filteredUsers = users.filter(user => 
    searchQuery === "" || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPresentations = presentations.filter(pres =>
    searchQuery === "" ||
    pres.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pres.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex flex-wrap gap-2 mb-6">
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
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "analytics"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            📈 Analytics
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
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "logs"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            📋 Activity Logs
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
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
              activeTab === "settings"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/20 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Search Bar */}
        {(activeTab === "users" || activeTab === "presentations" || activeTab === "logs") && (
          <div className="mb-6 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              {selectedItems.size > 0 && (
                <div className="flex items-center gap-2">
                  <select
                    value={bulkAction}
                    onChange={(e) => setBulkAction(e.target.value)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Bulk Actions ({selectedItems.size})</option>
                    <option value="delete">Delete Selected</option>
                    <option value="activate">Activate Selected</option>
                    <option value="deactivate">Deactivate Selected</option>
                    {activeTab === "users" && <option value="add_credits">Add Credits</option>}
                  </select>
                  <button
                    onClick={handleBulkAction}
                    disabled={!bulkAction}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-6 hidden">
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

        {/* Analytics Tab */}
        {!loading && activeTab === "analytics" && (
          <div className="space-y-6">
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">CPU Usage</h3>
                  <span className="text-3xl">🖥️</span>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {systemMetrics?.cpu_usage || 0}%
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${systemMetrics?.cpu_usage || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Memory Usage</h3>
                  <span className="text-3xl">💾</span>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {systemMetrics?.memory_usage || 0}%
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${systemMetrics?.memory_usage || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Active Users</h3>
                  <span className="text-3xl">👥</span>
                </div>
                <div className="text-3xl font-bold text-purple-400">
                  {systemMetrics?.active_users || 0}
                </div>
                <p className="text-sm text-gray-400 mt-2">Users online now</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Requests/Min</h3>
                  <span className="text-3xl">📡</span>
                </div>
                <div className="text-3xl font-bold text-yellow-400">
                  {systemMetrics?.requests_per_minute || 0}
                </div>
                <p className="text-sm text-gray-400 mt-2">API requests per minute</p>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Error Rate</h3>
                  <span className="text-3xl">⚠️</span>
                </div>
                <div className="text-3xl font-bold text-red-400">
                  {systemMetrics?.error_rate || 0}%
                </div>
                <p className="text-sm text-gray-400 mt-2">Failed requests</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Disk Usage</h3>
                  <span className="text-3xl">💿</span>
                </div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {systemMetrics?.disk_usage || 0}%
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${systemMetrics?.disk_usage || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                <h3 className="text-white font-medium mb-4">📈 User Growth (Last 30 Days)</h3>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>Chart integration available</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                <h3 className="text-white font-medium mb-4">💰 Revenue Trends</h3>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <p>Chart integration available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Logs Tab */}
        {!loading && activeTab === "logs" && (
          <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {activityLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        No activity logs found
                      </td>
                    </tr>
                  ) : (
                    activityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(log.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {log.user_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {log.resource}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                          {log.ip_address}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {!loading && activeTab === "settings" && systemSettings && (
          <div className="space-y-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6">
              <h3 className="text-white font-medium mb-6 text-xl">⚙️ System Settings</h3>
              
              <div className="space-y-6">
                {/* Maintenance Mode */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium mb-1">Maintenance Mode</h4>
                    <p className="text-sm text-gray-400">Temporarily disable access for maintenance</p>
                  </div>
                  <button
                    onClick={() => handleUpdateSettings({ maintenance_mode: !systemSettings.maintenance_mode })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      systemSettings.maintenance_mode ? 'bg-red-600' : 'bg-green-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        systemSettings.maintenance_mode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Registration */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium mb-1">User Registration</h4>
                    <p className="text-sm text-gray-400">Allow new users to register</p>
                  </div>
                  <button
                    onClick={() => handleUpdateSettings({ registration_enabled: !systemSettings.registration_enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      systemSettings.registration_enabled ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        systemSettings.registration_enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Max Upload Size */}
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium mb-1">Max Upload Size</h4>
                      <p className="text-sm text-gray-400">Maximum file upload size in MB</p>
                    </div>
                    <span className="text-2xl font-bold text-purple-400">{systemSettings.max_upload_size} MB</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={systemSettings.max_upload_size}
                    onChange={(e) => handleUpdateSettings({ max_upload_size: parseInt(e.target.value) })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Default Credits */}
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium mb-1">Default Credits</h4>
                      <p className="text-sm text-gray-400">Starting credits for new users</p>
                    </div>
                    <span className="text-2xl font-bold text-yellow-400">{systemSettings.default_credits}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={systemSettings.default_credits}
                    onChange={(e) => handleUpdateSettings({ default_credits: parseInt(e.target.value) })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* API Rate Limit */}
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium mb-1">API Rate Limit</h4>
                      <p className="text-sm text-gray-400">Requests per minute per user</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-400">{systemSettings.api_rate_limit}/min</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={systemSettings.api_rate_limit}
                    onChange={(e) => handleUpdateSettings({ api_rate_limit: parseInt(e.target.value) })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-red-400 font-medium mb-4 text-xl">⚠️ Danger Zone</h3>
              <div className="space-y-3">
                <button
                  onClick={() => confirm('Clear all cache?') && alert('Cache cleared!')}
                  className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 rounded-lg transition-colors text-left"
                >
                  🗑️ Clear Application Cache
                </button>
                <button
                  onClick={() => confirm('Reset all user sessions?') && alert('Sessions reset!')}
                  className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 rounded-lg transition-colors text-left"
                >
                  🔄 Reset All User Sessions
                </button>
                <button
                  onClick={() => confirm('Export database backup?') && alert('Backup initiated!')}
                  className="w-full px-4 py-3 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/50 text-orange-300 rounded-lg transition-colors text-left"
                >
                  💾 Export Database Backup
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
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(new Set(filteredUsers.map(u => u.id)));
                          } else {
                            setSelectedItems(new Set());
                          }
                        }}
                        className="rounded"
                      />
                    </th>
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
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(user.id)}
                            onChange={() => toggleItemSelection(user.id)}
                            className="rounded"
                          />
                        </td>
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
                          <span className="text-xs text-gray-400 ml-2">
                            ({user.total_credits_used.toLocaleString()} used)
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="View Details"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, user.is_active ? 'deactivate' : 'activate')}
                            className={user.is_active ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"}
                            title={user.is_active ? 'Deactivate' : 'Activate'}
                          >
                            {user.is_active ? '🔒 Suspend' : '✅ Activate'}
                          </button>
                          <button
                            onClick={() => openAddCreditsModal(user)}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors"
                            title="Add Credits"
                          >
                            💰 Credits
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Detail Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-white/10 rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">User Details</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Username</p>
                    <p className="text-white font-medium">{selectedUser.username}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white font-medium">{selectedUser.full_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Subscription Tier</p>
                    <span className="px-2 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full">
                      {selectedUser.subscription_tier}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Credits Available</p>
                    <p className="text-yellow-400 font-bold text-lg">{selectedUser.credits.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Credits Used</p>
                    <p className="text-red-400 font-medium">{selectedUser.total_credits_used.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Account Status</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser.is_active ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                    }`}>
                      {selectedUser.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Verified</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser.is_verified ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                    }`}>
                      {selectedUser.is_verified ? "Verified" : "Not Verified"}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Created At</p>
                    <p className="text-white text-sm">{formatDate(selectedUser.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Last Login</p>
                    <p className="text-white text-sm">{formatDate(selectedUser.last_login)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    handleUserAction(selectedUser.id, selectedUser.is_active ? 'deactivate' : 'activate');
                    setShowUserModal(false);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedUser.is_active
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {selectedUser.is_active ? '🔒 Suspend User' : '✅ Activate User'}
                </button>
                <button
                  onClick={() => openAddCreditsModal(selectedUser)}
                  className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                >
                  💰 Add Credits
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Credits Modal */}
        {showAddCreditsModal && creditsTargetUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Credits</h3>
                <p className="text-sm text-gray-600">
                  Add credits to <span className="font-semibold">{creditsTargetUser.username}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Current balance: <span className="font-semibold text-yellow-600">{creditsTargetUser.credits.toLocaleString()}</span> credits
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add credits amount:
                </label>
                <input
                  type="number"
                  min="1"
                  value={creditsAmount}
                  onChange={(e) => setCreditsAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddCredits();
                    }
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddCreditsModal(false);
                    setCreditsAmount("");
                    setCreditsTargetUser(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCredits}
                  disabled={!creditsAmount || parseInt(creditsAmount) <= 0}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  OK
                </button>
              </div>
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
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(new Set(filteredPresentations.map(p => p.id)));
                          } else {
                            setSelectedItems(new Set());
                          }
                        }}
                        className="rounded"
                      />
                    </th>
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
                  {filteredPresentations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                        No presentations found. Create your first presentation!
                      </td>
                    </tr>
                  ) : (
                    filteredPresentations.map((pres) => (
                      <tr key={pres.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(pres.id)}
                            onChange={() => toggleItemSelection(pres.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white max-w-xs truncate" title={pres.title}>
                            {pres.title}
                          </div>
                          {pres.description && (
                            <div className="text-xs text-gray-400 max-w-xs truncate" title={pres.description}>
                              {pres.description}
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
                            title="View presentation"
                          >
                            👁️
                          </a>
                          <button
                            onClick={() => {
                              localStorage.setItem('editorJobId', pres.id);
                              window.location.href = '/editor';
                            }}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="Edit in editor"
                          >
                            ✏️
                          </button>
                          <a
                            href={`${API_BASE}/api/presentations/${pres.id}/export.zip`}
                            download
                            className="text-green-400 hover:text-green-300 transition-colors"
                            title="Download as ZIP"
                          >
                            📦
                          </a>
                          <button
                            onClick={() => confirm(`Delete "${pres.title}"?`) && handleUserAction(pres.id, 'delete')}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete"
                          >
                            🗑️
                          </button>
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
