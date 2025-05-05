import { useState } from 'react';
import { API_BASE } from '../services/config';

export default function RegisterForm({ onRegistered }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('${API_BASE}/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccess(true);
      onRegistered && onRegistered(); // auto-login or switch to login view
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded-xl space-y-4 mt-10">
      <h2 className="text-xl font-semibold text-center">Register</h2>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center">Account created! You can now log in.</div>}

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
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
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
        Register
      </button>
    </form>
  );
}
