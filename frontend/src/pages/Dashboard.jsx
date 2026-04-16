import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Shield } from 'lucide-react';

const Dashboard = () => {
  const { user, role, logout } = useAuth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold gradient-text">Smart Campus Hub</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-morphism rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-primary-500/20">
                <UserIcon className="w-6 h-6 text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 text-sm">Email Address</p>
                <p className="text-white font-medium">{user}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Account Role</p>
                <span className="inline-block px-3 py-1 bg-primary-600/20 text-primary-400 text-xs font-bold rounded-full mt-1">
                  {role}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-morphism rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/20">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold">Access Level</h2>
            </div>
            {role === 'ADMIN' ? (
              <p className="text-slate-400">You have full administrative access to the Smart Campus Hub.</p>
            ) : role === 'TECHNICIAN' ? (
              <p className="text-slate-400">You have Technician access. You can manage maintenance tickets and resources.</p>
            ) : (
              <p className="text-slate-400">You have standard user access. Contact an admin for elevated permissions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
