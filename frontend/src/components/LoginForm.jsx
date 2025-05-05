import { API_BASE } from '../services/api';
import { useState } from 'react';

/**
 * LoginForm component handles user login functionality.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.onLogin - Callback function to be called after successful login.
 *
 * @returns {JSX.Element} A form for user login.
 *
 * @example
 * <LoginForm onLogin={() => console.log('User logged in')} />
 *
 * @remarks
 * - The component uses `useState` to manage form state and error messages.
 * - It sends a POST request to the login API endpoint with the form data.
 * - On successful login, it stores the token in localStorage and calls the `onLogin` callback.
 * - Displays an error message if the login fails.
 */
export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('token', data.token);
      onLogin && onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded-xl space-y-4 mt-10">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <input
        type="text"
        name="name"
        placeholder="Username"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Login
      </button>
    </form>
  );
}
