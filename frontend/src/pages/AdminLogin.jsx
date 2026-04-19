import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, Loader2, ShieldCheck, Eye, EyeOff, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Could not connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center p-4 py-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl overflow-hidden shadow-sky-900/10">
          <div className="bg-gradient-to-br from-[#1e448b] to-[#163266] p-10 text-center text-white relative">
             <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={120} /></div>
             <div className="p-4 bg-white/10 rounded-2xl inline-block mb-4 backdrop-blur-md">
               <Lock size={32} className="text-yellow-400" />
             </div>
             <h1 className="text-3xl font-black uppercase tracking-widest">Admin Access</h1>
             <p className="text-sky-100/60 text-sm mt-2 uppercase font-bold tracking-tighter">Gurukul Vidya Niketan Management</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" /> {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Username</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500 transition-all font-medium"
                    placeholder="officialsanskarschool@gmail.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500 transition-all font-medium"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#1e448b] hover:bg-[#163266] text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-sky-900/20 active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <>Authenticating... <Loader2 size={24} className="animate-spin" /></>
              ) : (
                <>Sign In Securely <LogIn size={20} /></>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-xs font-bold uppercase tracking-widest italic">
          Authorized personnel only. All access attempts are logged.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
