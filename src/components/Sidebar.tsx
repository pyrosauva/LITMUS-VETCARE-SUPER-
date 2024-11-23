import React from 'react';
import { Calendar, Activity, Users, PawPrint } from 'lucide-react';
import type { View } from '../App';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navigation = [
    { name: 'Dashboard', icon: Activity, view: 'dashboard' as View },
    { name: 'Appointments', icon: Calendar, view: 'appointments' as View },
    { name: 'Patients', icon: PawPrint, view: 'patients' as View },
    { name: 'Staff', icon: Users, view: 'staff' as View },
  ];

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <aside
      className={`${
        isMobileMenuOpen ? 'block' : 'hidden'
      } lg:block lg:w-64 bg-white border-r min-h-screen fixed lg:sticky top-0 z-10`}
    >
      <div className="h-full px-3 py-4">
        <div className="hidden lg:flex items-center mb-8 px-2">
          <PawPrint className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-semibold">VetCare Pro</span>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.view)}
              className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
                currentView === item.view
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;