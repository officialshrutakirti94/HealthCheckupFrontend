import React from 'react';
import { User, LogOut, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const navigateTo = (page: any) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  if (!state.isAuthenticated) return null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigateTo('dashboard')}
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DiagnoX</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigateTo('dashboard')}
              className={`text-sm font-medium transition-colors ${state.currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigateTo('health-form')}
              className={`text-sm font-medium transition-colors ${state.currentPage === 'health-form' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Health Check
            </button>
            <button 
              onClick={() => navigateTo('doctors')}
              className={`text-sm font-medium transition-colors ${state.currentPage === 'doctors' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Find Doctors
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateTo('profile')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:block text-sm font-medium">
                {state.user?.firstName}
              </span>
            </button>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};