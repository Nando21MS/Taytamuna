import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import Registro from './components/Registro';
import BuyerDashboard from './components/BuyerDashboard';
import FarmerDashboard from './components/FarmerDashboard';

const App = () => {
  const [user, setUser] = useState(null); // null o { role: 'buyer' | 'farmer', username }
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome | auth | registro | dashboard

  const handleLogin = (username, password) => {
    if (username === 'Fernando' && password === '123456') {
      setUser({ role: 'farmer', username });
      setCurrentScreen('dashboard');
    } else if (username === 'Astrid' && password === '789123') {
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

  // Pantalla de bienvenida
  if (currentScreen === 'welcome') {
    return (
      <WelcomePage
        onNavigate={(screen) => setCurrentScreen(screen)} // 'auth' o 'registro'
      />
    );
  }

  // Pantalla de login
  if (!user && currentScreen === 'auth') {
    return (
      <AuthPage
        onLogin={handleLogin}
      />
    );
  }

  // Pantalla de registro
  if (!user && currentScreen === 'registro') {
    return (
      <Registro />
    );
  }

  // Pantalla de dashboard después del login
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
