'use client';

import { useState } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AuthButton = () => {
  // Simulasi user state (nanti akan diganti dengan Supabase auth)
  const [user, setUser] = useState<{ email: string } | null>({
    email: 'user@example.com'
  });
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    // Simulasi logout
    setUser(null);
    router.push('/login');
  };

  if (!user) {
    return (
      <button
        onClick={handleLogin}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
      >
        <LogIn size={18} />
        <span className="font-medium">Masuk</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* User Info */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
        <div className="p-1.5 bg-indigo-100 rounded-full">
          <User size={16} className="text-indigo-600" />
        </div>
        <span className="text-sm font-medium text-slate-700">{user.email}</span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
        title="Logout"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline font-medium">Keluar</span>
      </button>
    </div>
  );
};
