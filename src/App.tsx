import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Onboarding } from './components/onboarding/Onboarding';
import { Dashboard } from './components/dashboard/Dashboard';
import { HealthForm } from './components/health/HealthForm';
import { PredictionResults } from './components/predictions/PredictionResults';
import { DoctorsList } from './components/doctors/DoctorsList';
import { Profile } from './components/profile/Profile';

const AppContent: React.FC = () => {
  const { state } = useApp();
// egtter chuda saka paka lala snata fh
  const renderPage = () => {
    switch (state.currentPage) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'onboarding':
        return <Onboarding />;
      case 'dashboard':
        return <Dashboard />;
      case 'health-form':
        return <HealthForm />;
      case 'predictions':
        return <PredictionResults />;
      case 'doctors':
        return <DoctorsList />;
      case 'profile':
        return <Profile />;
      default:
        return <Login />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="transition-all duration-300 ease-in-out">
        {renderPage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;