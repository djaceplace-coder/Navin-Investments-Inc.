import { motion } from 'motion/react';
import { User, Bell, Shield, Key, CreditCard, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export function Settings() {
  const { user } = useAuth();
  const { openAgentChat } = useOutletContext<{ openAgentChat: (prefill?: string) => void }>();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security & Login', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Linked Accounts', icon: CreditCard },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-2">Account Settings</h1>
        <p className="text-slate-500">Manage your profile, security preferences, and linked accounts.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50 p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-10">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-slate-500">
                  JD
                </div>
                <div>
                  <button onClick={() => openAgentChat('I want to change my profile photo.')} className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors mb-2">
                    Change Photo
                  </button>
                  <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input type="text" defaultValue={user?.user_metadata?.first_name || ""} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input type="text" defaultValue={user?.user_metadata?.last_name || ""} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 focus:bg-white" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input type="email" defaultValue={user?.email || ""} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 focus:bg-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 focus:bg-white" />
                </div>

                <div className="pt-4 flex justify-end">
                  <button onClick={() => openAgentChat('I want to save changes to my profile.')} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Security Settings</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4 text-slate-400" /> Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 focus:bg-white" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 focus:bg-white" />
                      </div>
                    </div>
                    <button onClick={() => openAgentChat('I want to update my password.')} className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-medium text-sm hover:bg-slate-200 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-400" /> Two-Factor Authentication
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-slate-900">Authenticator App</div>
                      <div className="text-sm text-slate-500 mt-1">Use an app like Google Authenticator or Authy to generate verification codes.</div>
                    </div>
                    <button onClick={() => openAgentChat('I want to enable 2FA.')} className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors whitespace-nowrap">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                {[
                  { title: 'Trade Confirmations', desc: 'Receive emails when your trades are executed.' },
                  { title: 'Deposit & Withdrawal Alerts', desc: 'Get notified when funds enter or leave your account.' },
                  { title: 'Security Alerts', desc: 'Critical alerts regarding your account security (Mandatory).' },
                  { title: 'Market Updates', desc: 'Weekly newsletter with market insights and trends.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div className="pr-4">
                      <div className="font-medium text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-500 mt-0.5">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i !== 3} disabled={i === 2} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900 peer-disabled:opacity-50"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'billing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Linked Accounts</h2>
              <p className="text-slate-500 mb-6">Manage external bank accounts linked for deposits and withdrawals.</p>
              
              <div className="space-y-4 mb-8">
                <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      CH
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Chase Checking</div>
                      <div className="text-sm text-slate-500">•••• •••• •••• 4829</div>
                    </div>
                  </div>
                  <button onClick={() => openAgentChat('I want to remove a linked bank account.')} className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                    Remove
                  </button>
                </div>
              </div>
              
              <button onClick={() => openAgentChat('I want to link a new bank account.')} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" /> Link New Bank Account
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
