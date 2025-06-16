import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import BuyerDashboard from './components/BuyerDashboard';
import FarmerDashboard from './components/FarmerDashboard';

const App = () => {
  const [user, setUser] = useState(null); // null o { role: 'buyer' | 'farmer', username }
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome | auth | dashboard

  const handleLogin = (username, password) => {
    if (username === 'productor1' && password === '123456') {
      setUser({ role: 'farmer', username });
      setCurrentScreen('dashboard');
    } else if (username === 'comprador1' && password === '789123') {
      setUser({ role: 'buyer', username });
      setCurrentScreen('dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('welcome');
  };

  if (currentScreen === 'welcome') {
    return <WelcomePage onNavigateToLogin={() => setCurrentScreen('auth')} />;
  }

  if (!user && currentScreen === 'auth') {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <>
      {user.role === 'buyer' ? (
        <BuyerDashboard username={user.username} onLogout={handleLogout} />
      ) : (
        <FarmerDashboard username={user.username} onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;
