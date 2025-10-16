'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Activity, 
  TrendingUp, 
  Settings, 
  Shield,
  BarChart3,
  Zap,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Loader2
} from 'lucide-react';

type TabType = 'overview' | 'users' | 'content' | 'analytics' | 'settings';

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalContent: number;
  totalRevenue: number;
  userGrowth: number;
  contentGrowth: number;
  revenueGrowth: number;
  activeGrowth: number;
  totalOrgs?: number;
  totalPresentations?: number;
  totalDubbing?: number;
}

interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  status: string;
  joined: string;
  projects: number;
  orgs?: number;
  lastActive?: string;
}

interface Content {
  id: string;
  title: string;
  user: string;
  type: string;
  created: string;
  status: string;
  language?: string;
  slidesCount?: number;
  sourceLang?: string;
  targetLang?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentContent, setRecentContent] = useState<Content[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState(true);

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      
      if (data.success === false) {
        console.warn('Stats API returned with error:', data.error);
        setDbConnected(false);
        // Still set the data with fallback values
        setStats({
          totalUsers: 0,
          activeUsers: 0,
          totalContent: 0,
          totalRevenue: 0,
          userGrowth: 0,
          contentGrowth: 0,
          revenueGrowth: 0,
          activeGrowth: 0,
        });
      } else {
        setStats(data);
        setDbConnected(true);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to connect to database. Please check your connection.');
      setDbConnected(false);
      // Set empty stats as fallback
      setStats({
        totalUsers: 0,
        activeUsers: 0,
        totalContent: 0,
        totalRevenue: 0,
        userGrowth: 0,
        contentGrowth: 0,
        revenueGrowth: 0,
        activeGrowth: 0,
      });
    }
  };

  // Fetch recent users
  const fetchUsers = async (limit = 5) => {
    try {
      const response = await fetch(`/api/admin/users?limit=${limit}`);
      const data = await response.json();
      
      if (data.success === false) {
        console.warn('Users API returned with error:', data.error);
      }
      
      if (limit === 5) {
        setRecentUsers(data.users || []);
      } else {
        setAllUsers(data.users || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      if (limit === 5) {
        setRecentUsers([]);
      } else {
        setAllUsers([]);
      }
    }
  };

  // Fetch recent content
  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content?limit=5');
      const data = await response.json();
      
      if (data.success === false) {
        console.warn('Content API returned with error:', data.error);
      }
      
      setRecentContent(data.content || []);
    } catch (err) {
      console.error('Error fetching content:', err);
      setRecentContent([]);
    }
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchStats(),
        fetchUsers(5),
        fetchContent(),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Load all users when users tab is active
  useEffect(() => {
    if (activeTab === 'users' && allUsers.length === 0) {
      fetchUsers(50);
    }
  }, [activeTab]);

  const handleRefresh = async () => {
    setLoading(true);
    await Promise.all([
      fetchStats(),
      fetchUsers(activeTab === 'users' ? 50 : 5),
      fetchContent(),
    ]);
    setLoading(false);
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Connecting to database...</p>
        </div>
      </div>
    );
  }

  // Show warning banner for empty data instead of full error screen
  const showEmptyDataWarning = stats && stats.totalUsers === 0 && stats.totalContent === 0;

  if (error && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold mb-2">Error Loading Dashboard</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800 mb-2">
              <strong>Possible causes:</strong>
            </p>
            <ul className="text-xs text-yellow-700 text-left space-y-1">
              <li>• Database connection is not configured</li>
              <li>• DATABASE_URL is missing in .env</li>
              <li>• Prisma migrations haven't been run</li>
              <li>• Database server is offline</li>
            </ul>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                  {!loading && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      dbConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        dbConnected ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      {dbConnected ? 'Connected' : 'Offline'}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">Manage your platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Empty Data Warning Banner */}
        {showEmptyDataWarning && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                  No Data Available
                </h3>
                <p className="text-sm text-blue-800 mb-2">
                  Your database is connected but contains no data yet. This is normal for a new installation.
                </p>
                <p className="text-xs text-blue-700">
                  Data will appear here once users start creating presentations, dubbing videos, or signing up to your platform.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Users */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {(stats?.userGrowth ?? 0).toFixed(1)}%
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{(stats?.totalUsers ?? 0).toLocaleString()}</h3>
                <p className="text-sm text-gray-500 mt-1">Total Users</p>
              </div>

              {/* Active Users */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {(stats?.activeGrowth ?? 0).toFixed(1)}%
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{(stats?.activeUsers ?? 0).toLocaleString()}</h3>
                <p className="text-sm text-gray-500 mt-1">Active Users</p>
              </div>

              {/* Total Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {(stats?.contentGrowth ?? 0).toFixed(1)}%
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{(stats?.totalContent ?? 0).toLocaleString()}</h3>
                <p className="text-sm text-gray-500 mt-1">Total Content</p>
              </div>

              {/* Revenue */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                    <TrendingUp className="w-4 h-4" />
                    N/A
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">$0</h3>
                <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentUsers.length > 0 ? (
                    recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-700' :
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm font-medium">No users yet</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Users will appear here once they sign up
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Content</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentContent.length > 0 ? (
                    recentContent.map((content) => (
                      <div key={content.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{content.title}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {content.user} • {new Date(content.created).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            content.status === 'completed' ? 'bg-green-100 text-green-700' :
                            content.status === 'running' || content.status === 'queued' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {content.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm font-medium">No content yet</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Presentations and dubbing jobs will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(activeTab === 'users' ? allUsers : recentUsers).length > 0 ? (
                      (activeTab === 'users' ? allUsers : recentUsers).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' :
                              user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status === 'active' && <CheckCircle className="w-3 h-3" />}
                              {user.status === 'pending' && <Clock className="w-3 h-3" />}
                              {user.status === 'inactive' && <XCircle className="w-3 h-3" />}
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.projects}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joined}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button className="text-blue-600 hover:text-blue-700" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-700" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-700" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600" title="More">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm font-medium">No users found</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {searchQuery ? 'Try a different search term' : 'Users will appear here once they sign up'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Management</h3>
            <p className="text-gray-500">Content management features coming soon...</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Reports</h3>
            <p className="text-gray-500">Analytics dashboard coming soon...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
            <p className="text-gray-500">Settings panel coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
