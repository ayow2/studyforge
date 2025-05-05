import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [userId, setUserId] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token); // contains id, name
        setUser(decoded);
      }
    } catch {
      localStorage.removeItem('token');
    }
  });

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserId(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {userId ? (
        <Dashboard user={user} userId={userId} onLogout={handleLogout} />
      ) : showRegister ? (
        <>
          <RegisterForm onRegistered={() => setShowRegister(false)} />
          <p className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <button onClick={() => setShowRegister(false)} className="text-indigo-600 underline">
              Log in here
            </button>
          </p>
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} />
          <p className="text-center mt-4 text-sm">
            Don't have an account?{' '}
            <button onClick={() => setShowRegister(true)} className="text-indigo-600 underline">
              Register here
            </button>
          </p>
        </>
      )}
    </main>
  );
}

export default App;
