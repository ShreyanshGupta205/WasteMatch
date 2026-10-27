import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Factory,
  Building2,
  ShieldCheck,
  ArrowRight,
  Flame,
  CheckCircle2,
  Sparkles,
  Lock,
  Mail,
  AlertCircle,
} from 'lucide-react';
import { useDashboardStore, SEED_USERS, UserRole } from '../../store/dashboardStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useDashboardStore();

  const [email, setEmail] = useState('seller@shreeganesh.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('seller');

  const handlePersonaLogin = (role: UserRole) => {
    const user = SEED_USERS[role];
    setCurrentUser(user);
    if (role === 'seller') navigate('/seller');
    else if (role === 'buyer') navigate('/buyer');
    else if (role === 'admin') navigate('/admin');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePersonaLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          onClick={() => navigate('/')}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition"
        >
          <span>← Back to Homepage</span>
        </button>

        <div className="inline-flex items-center justify-center gap-2.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#D1343A] flex items-center justify-center text-white font-bold text-xl shadow-md">
            W
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#0B0F19]">
            Waste<span className="text-[#D1343A]">Match</span>
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#0B0F19]">
          Industrial Symbiosis & Co-Processing Platform
        </h2>
        <p className="mt-1 text-xs text-stone-600">
          Sign in to access your designated role dashboard (3 Role-Based Portals Only)
        </p>
      </div>


      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl px-4 sm:px-0">
        {/* Quick Demo Persona Switcher Banner */}
        <div className="mb-6 bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D1343A]" /> 1-Click Demo Persona Access
            </span>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Pre-seeded KYC Accounts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Persona 1: Seller */}
            <button
              onClick={() => handlePersonaLogin('seller')}
              className="text-left p-3.5 rounded-xl border border-stone-200 bg-[#F8F6F5] hover:border-[#D1343A] hover:bg-white hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 uppercase">
                  1. Seller / Generator
                </span>
                <Factory className="w-4 h-4 text-stone-400 group-hover:text-[#D1343A] transition" />
              </div>
              <h4 className="text-xs font-bold text-stone-900 leading-snug">Shree Ganesh Galvanizers</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 truncate">Spent HCl & Lime Sludge</p>
              <div className="mt-2 text-[10px] font-mono text-[#D1343A] font-medium flex items-center gap-1">
                Launch Seller Portal <ArrowRight className="w-3 h-3" />
              </div>
            </button>

            {/* Persona 2: Buyer */}
            <button
              onClick={() => handlePersonaLogin('buyer')}
              className="text-left p-3.5 rounded-xl border border-stone-200 bg-[#F8F6F5] hover:border-[#D1343A] hover:bg-white hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                  2. Buyer / Receiver
                </span>
                <Building2 className="w-4 h-4 text-stone-400 group-hover:text-[#D1343A] transition" />
              </div>
              <h4 className="text-xs font-bold text-stone-900 leading-snug">Aravali Cement Works</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 truncate">450 MT/mo AFR Kiln Intake</p>
              <div className="mt-2 text-[10px] font-mono text-[#D1343A] font-medium flex items-center gap-1">
                Launch Buyer Portal <ArrowRight className="w-3 h-3" />
              </div>
            </button>

            {/* Persona 3: Admin */}
            <button
              onClick={() => handlePersonaLogin('admin')}
              className="text-left p-3.5 rounded-xl border border-stone-200 bg-[#F8F6F5] hover:border-[#D1343A] hover:bg-white hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-white uppercase">
                  3. Admin
                </span>
                <ShieldCheck className="w-4 h-4 text-stone-400 group-hover:text-[#D1343A] transition" />
              </div>
              <h4 className="text-xs font-bold text-stone-900 leading-snug">Platform Operations</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 truncate">Compliance, KYC & Escrow</p>
              <div className="mt-2 text-[10px] font-mono text-[#D1343A] font-medium flex items-center gap-1">
                Launch Admin Console <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          </div>
        </div>

        {/* Standard Credentials Form Card */}
        <div className="bg-white py-8 px-6 shadow-sm border border-[#E2E4DC] sm:rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div>
              <label className="block text-xs font-semibold text-stone-700">Target Role Dashboard</label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {(['seller', 'buyer', 'admin'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      setEmail(SEED_USERS[role].email);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border capitalize transition ${
                      selectedRole === role
                        ? 'border-[#D1343A] bg-red-50/50 text-[#D1343A]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700">Email Address</label>
              <div className="mt-1 relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700">Password / OTP</label>
              <div className="mt-1 relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-stone-600">
                <input type="checkbox" defaultChecked className="rounded border-stone-300 text-[#D1343A] mr-2" />
                Remember active session
              </label>
              <a href="#forgot" className="text-[#D1343A] hover:underline font-semibold">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 rounded-xl shadow-sm text-xs font-semibold text-white bg-[#D1343A] hover:bg-[#A81818] transition focus:outline-none"
            >
              Sign In to {selectedRole.toUpperCase()} Dashboard
            </button>
          </form>

          {/* Regulatory Note */}
          <div className="mt-6 pt-5 border-t border-stone-100 text-[11px] text-stone-500 text-center">
            Compliant with SPCB Hazardous and Other Wastes (M&THM) Rules 2016 • Tripartite Escrow by ICICI Bank
          </div>
        </div>
      </div>
    </div>
  );
};
