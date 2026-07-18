/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthView from './components/AuthView';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [user, setUser] = useState<{ name: string; email: string; companyName: string } | null>(null);

  const handleLoginSuccess = (userData: { name: string; email: string; companyName: string }) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  return (
    <>
      {view === 'landing' && (
        <LandingPage onGetStarted={() => setView('auth')} />
      )}
      {view === 'auth' && (
        <AuthView 
          onBackToLanding={() => setView('landing')} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      {view === 'dashboard' && user && (
        <Dashboard 
          userProfileData={user} 
          onLogout={handleLogout} 
        />
      )}
    </>
  );
}

