'use client';

import { Sidebar } from './Sidebar';
import { useLayout } from '@/context/LayoutContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { isSidebarOpen } = useLayout();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-0 lg:ml-80' : 'ml-0 lg:ml-16'
        }`}
      >
        {children}
      </main>
    </div>
  );
};
