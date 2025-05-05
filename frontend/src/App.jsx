import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      }
    } catch (err) {
      console.error("Invalid token:", err.message);
      localStorage.removeItem('token'); // prevent repeated crashes
    }
  }, []);

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
      {userId ? <Dashboard userId={userId} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
    </main>
  );
}

export default App;
