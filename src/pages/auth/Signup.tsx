import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Check, Briefcase, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialIntent = searchParams.get('intent') || '';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    intent: initialIntent
  });

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            intent: formData.intent
          }
        }
      });
      if (signUpError) throw signUpError;
      
      handleNext();
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6">
      <motion.div 
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-12 overflow-hidden relative min-h-[500px]"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-heading font-bold text-2xl leading-none">I</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-6">
            <motion.div 
              className="bg-slate-900 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">Create Account</h2>
              <p className="text-slate-500 mb-8">Start your journey with NAVIN INVESTMENT INC.</p>
              
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full p-3 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all bg-slate-50 focus:bg-white"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
                className="w-full bg-slate-900 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-slate-800 transition-all disabled:opacity-50 mt-8 flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account? <Link to="/login" className="font-semibold text-slate-900 hover:underline">Log in</Link>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">What brings you here?</h2>
              <p className="text-slate-500 mb-8">We'll customize your dashboard based on your goals.</p>
              
              <div className="space-y-4 mb-8">
                <button
                  onClick={() => setFormData({ ...formData, intent: 'invest' })}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                    formData.intent === 'invest' 
                      ? 'border-slate-900 bg-slate-50' 
                      : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${formData.intent === 'invest' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-bold ${formData.intent === 'invest' ? 'text-slate-900' : 'text-slate-700'}`}>Investing</div>
                    <div className="text-sm text-slate-500">Equities, crypto, alternative assets</div>
                  </div>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, intent: 'insurance' })}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                    formData.intent === 'insurance' 
                      ? 'border-slate-900 bg-slate-50' 
                      : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${formData.intent === 'insurance' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-bold ${formData.intent === 'insurance' ? 'text-slate-900' : 'text-slate-700'}`}>Insurance</div>
                    <div className="text-sm text-slate-500">Life, health, property coverage</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setFormData({ ...formData, intent: 'both' })}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                    formData.intent === 'both' 
                      ? 'border-slate-900 bg-slate-50' 
                      : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${formData.intent === 'both' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-bold ${formData.intent === 'both' ? 'text-slate-900' : 'text-slate-700'}`}>Both</div>
                    <div className="text-sm text-slate-500">I want the complete holistic platform</div>
                  </div>
                </button>
              </div>

              {error && (
                <div className="mb-4 text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div className="mt-auto flex justify-between gap-4">
                <button 
                  onClick={() => setCurrentStep(0)} 
                  className="text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleSignup}
                  disabled={!formData.intent || loading}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Continue'}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col h-full items-center justify-center text-center py-8"
            >
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Account created!</h2>
              <p className="text-slate-500 mb-8">
                Welcome to NAVIN INVESTMENT INC., {formData.lastName}. Next, we'll need to verify your identity to comply with financial regulations.
              </p>
              <button 
                className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-all"
                onClick={() => navigate('/dashboard')}
              >
                Verify Identity (KYC)
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full text-slate-500 px-8 py-4 mt-2 font-medium hover:text-slate-900 transition-all text-sm"
              >
                Skip for now
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
