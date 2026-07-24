import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'motion/react';
import { DollarSign, Search, Edit2, Save, X, Activity } from 'lucide-react';

type UserBalance = {
  id: string;
  profile_id: string;
  email: string;
  first_name: string;
  last_name: string;
  total_balance: number;
  invested_amount: number;
  cash_balance: number;
  returns_amount: number;
  created_at: string;
  updated_at: string;
};

export function AdminBalances() {
  const [balances, setBalances] = useState<UserBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserBalance>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profile_balances')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching balances:', error);
      } else {
        setBalances(data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (balance: UserBalance) => {
    setEditingId(balance.id);
    setEditForm({
      total_balance: balance.total_balance,
      invested_amount: balance.invested_amount,
      cash_balance: balance.cash_balance,
      returns_amount: balance.returns_amount,
    });
  };

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profile_balances')
        .update({
          total_balance: editForm.total_balance,
          invested_amount: editForm.invested_amount,
          cash_balance: editForm.cash_balance,
          returns_amount: editForm.returns_amount,
        })
        .eq('id', id);

      if (error) throw error;
      
      setBalances(balances.map(b => b.id === id ? { ...b, ...editForm } : b));
      setEditingId(null);
    } catch (err) {
      console.error('Error updating balance:', err);
      alert('Failed to update balance');
    }
  };

  const filteredBalances = balances.filter(b => 
    b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-white">User Balances</h1>
            <p className="text-slate-400">Manage asset and investment balances across all clients</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-slate-700 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950 text-xs uppercase font-medium text-slate-500 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Total Balance</th>
                  <th className="px-6 py-4">Invested</th>
                  <th className="px-6 py-4">Cash</th>
                  <th className="px-6 py-4">Returns</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      Loading balances...
                    </td>
                  </tr>
                ) : filteredBalances.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No users found. Remember to run the SQL snippet in Supabase to create the table and triggers.
                    </td>
                  </tr>
                ) : (
                  filteredBalances.map((balance) => (
                    <tr key={balance.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{balance.first_name} {balance.last_name}</div>
                        <div className="text-xs">{balance.email}</div>
                      </td>
                      {editingId === balance.id ? (
                        <>
                          <td className="px-6 py-4">
                            <input 
                              type="number" 
                              value={editForm.total_balance || 0}
                              onChange={(e) => setEditForm({...editForm, total_balance: parseFloat(e.target.value)})}
                              className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              type="number" 
                              value={editForm.invested_amount || 0}
                              onChange={(e) => setEditForm({...editForm, invested_amount: parseFloat(e.target.value)})}
                              className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              type="number" 
                              value={editForm.cash_balance || 0}
                              onChange={(e) => setEditForm({...editForm, cash_balance: parseFloat(e.target.value)})}
                              className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              type="number" 
                              value={editForm.returns_amount || 0}
                              onChange={(e) => setEditForm({...editForm, returns_amount: parseFloat(e.target.value)})}
                              className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleSave(balance.id)} className="text-emerald-400 hover:text-emerald-300 mr-3">
                              <Save className="w-4 h-4 inline" />
                            </button>
                            <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-300">
                              <X className="w-4 h-4 inline" />
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 font-medium text-white">
                            ${balance.total_balance?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            ${balance.invested_amount?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            ${balance.cash_balance?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-emerald-400">
                            +${balance.returns_amount?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleEditClick(balance)} className="text-blue-400 hover:text-blue-300">
                              <Edit2 className="w-4 h-4 inline" /> Edit
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
