import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../ui/Logo';
import { 
  Bell, Search, LayoutDashboard, PieChart, ShieldCheck, 
  ArrowLeftRight, MessageSquare, Settings, HelpCircle, LogOut,
  ChevronDown, X, Menu
} from 'lucide-react';
import { useState } from 'react';
import { AgentChatDrawer } from '../dashboard/AgentChatDrawer';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/portfolio', icon: PieChart },
  { name: 'Insurance', href: '/dashboard/insurance', icon: ShieldCheck },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
];

export function ClientLayout() {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrefill, setChatPrefill] = useState('');

  const openAgentChat = (prefill: string = '') => {
    setChatPrefill(prefill);
    setIsChatOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white fixed inset-y-0 z-40">
        <div className="h-[72px] flex items-center px-6 border-b border-slate-100">
          <Link to="/dashboard" className="flex items-center gap-3">
            <Logo className="h-6 w-auto flex-shrink-0" />
            <span className="font-medium tracking-[0.2em] text-xs text-slate-900 mt-1">
              INVESTMENT INC.
            </span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors"
          >
            <MessageSquare className="w-4 h-4" /> Message Agent
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4 lg:hidden">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Logo className="h-6 w-auto" />
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 max-w-xl px-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search assets, policies, or help articles..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm sm:text-base border-2 border-white shadow-sm">
                  {user?.user_metadata?.first_name?.[0] || ''}{user?.user_metadata?.last_name?.[0] || ''}
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 origin-top-right"
                    >
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900">{user?.user_metadata?.first_name} {user?.user_metadata?.last_name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                          <Settings className="w-4 h-4" /> Profile & Settings
                        </Link>
                        <Link to="/support" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                          <HelpCircle className="w-4 h-4" /> Help Center
                        </Link>
                      </div>
                      <div className="border-t border-slate-100 py-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                        >
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 relative pb-20 lg:pb-0">
          <Outlet context={{ openAgentChat }} />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-slate-900' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <AgentChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => {
          setIsChatOpen(false);
          setChatPrefill('');
        }}
        prefilledMessage={chatPrefill}
      />
    </div>
  );
}
