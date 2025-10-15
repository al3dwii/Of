"use client";

import React, { useState, useEffect } from 'react';
import { Coins, TrendingDown, Activity, Clock, ArrowLeft, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface CreditsData {
  user_id: string;
  credits: number;
  total_credits_used: number;
  last_activity: string;
}

interface Transaction {
  transaction_id: string;
  user_id: string;
  amount: number;
  reason: string;
  job_id?: string;
  timestamp: string;
  balance_after: number;
}

interface CreditCosts {
  costs: {
    generate_slide: number;
    edit_slide_with_prompt: number;
    manual_edit: number;
  };
  examples: {
    generate_5_slides: number;
    generate_10_slides: number;
    edit_3_slides_with_prompt: number;
    manual_edit_any_slides: number;
  };
}

export default function CreditsPage() {
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [costs, setCosts] = useState<CreditCosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchCreditsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch credits balance
      const creditsRes = await fetch(`${API_URL}/api/credits?user_id=default_user`);
      if (!creditsRes.ok) throw new Error('Failed to fetch credits');
      const creditsJson = await creditsRes.json();
      setCreditsData(creditsJson);

      // Fetch transactions
      const transactionsRes = await fetch(`${API_URL}/api/credits/transactions?user_id=default_user&limit=20`);
      if (!transactionsRes.ok) throw new Error('Failed to fetch transactions');
      const transactionsJson = await transactionsRes.json();
      setTransactions(transactionsJson.transactions || []);

      // Fetch credit costs
      const costsRes = await fetch(`${API_URL}/api/credits/costs`);
      if (!costsRes.ok) throw new Error('Failed to fetch costs');
      const costsJson = await costsRes.json();
      setCosts(costsJson);

    } catch (err: any) {
      console.error('Failed to fetch credits data:', err);
      setError(err.message || 'Failed to load credits data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreditsData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    return (
      <span className={isNegative ? 'text-red-500' : 'text-green-500'}>
        {isNegative ? '-' : '+'}
        {absAmount}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <RefreshCw className="animate-spin" size={24} />
          Loading credits...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchCreditsData}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Coins className="text-yellow-400" size={32} />
                Credits Dashboard
              </h1>
              <p className="text-gray-300 mt-1">Manage your presentation credits</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/database"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              🗄️ Database
            </Link>
            <button
              onClick={fetchCreditsData}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Balance */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Current Balance</h3>
              <Coins className="text-yellow-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-white">{creditsData?.credits || 0}</p>
            <p className="text-gray-400 text-sm mt-2">credits available</p>
          </div>

          {/* Total Used */}
          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Total Used</h3>
              <TrendingDown className="text-red-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-white">{creditsData?.total_credits_used || 0}</p>
            <p className="text-gray-400 text-sm mt-2">credits spent</p>
          </div>

          {/* Last Activity */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Last Activity</h3>
              <Clock className="text-blue-400" size={24} />
            </div>
            <p className="text-lg font-bold text-white">
              {creditsData?.last_activity ? formatDate(creditsData.last_activity) : 'N/A'}
            </p>
            <p className="text-gray-400 text-sm mt-2">most recent transaction</p>
          </div>
        </div>

        {/* Pricing Info */}
        {costs && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity size={24} />
              Credit Costs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Generate Slides</h3>
                <p className="text-3xl font-bold text-purple-400">{costs.costs.generate_slide}</p>
                <p className="text-gray-400 text-sm mt-1">credits per slide</p>
                <p className="text-gray-500 text-xs mt-2">
                  Example: 5 slides = {costs.examples.generate_5_slides} credits
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">AI Edit Slides</h3>
                <p className="text-3xl font-bold text-blue-400">{costs.costs.edit_slide_with_prompt}</p>
                <p className="text-gray-400 text-sm mt-1">credits per slide</p>
                <p className="text-gray-500 text-xs mt-2">
                  Example: Edit 3 slides = {costs.examples.edit_3_slides_with_prompt} credits
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Manual Edit</h3>
                <p className="text-3xl font-bold text-green-400">{costs.costs.manual_edit}</p>
                <p className="text-gray-400 text-sm mt-1">FREE</p>
                <p className="text-gray-500 text-xs mt-2">
                  Edit slides manually without using credits
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity size={24} />
            Recent Transactions
          </h2>

          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Activity size={48} className="mx-auto mb-4 opacity-50" />
              <p>No transactions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="pb-3 text-gray-300 font-medium">Date</th>
                    <th className="pb-3 text-gray-300 font-medium">Reason</th>
                    <th className="pb-3 text-gray-300 font-medium text-right">Amount</th>
                    <th className="pb-3 text-gray-300 font-medium text-right">Balance After</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.transaction_id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 text-gray-400 text-sm">
                        {formatDate(transaction.timestamp)}
                      </td>
                      <td className="py-4 text-white">
                        {transaction.reason}
                        {transaction.job_id && (
                          <span className="ml-2 text-xs text-gray-500">
                            ({transaction.job_id.slice(0, 8)}...)
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-right font-semibold">
                        {formatAmount(transaction.amount)}
                      </td>
                      <td className="py-4 text-right text-gray-300">
                        {transaction.balance_after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/test-agentic"
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold"
          >
            <Plus size={20} />
            Create Presentation
          </Link>
          <Link
            href="/editor"
            className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold"
          >
            <Activity size={20} />
            Edit Presentation
          </Link>
        </div>
      </div>
    </div>
  );
}
