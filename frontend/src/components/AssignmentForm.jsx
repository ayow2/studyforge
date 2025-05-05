import { useState } from 'react';
import { createAssignment } from '../services/api';

export default function AssignmentForm() {
  const [form, setForm] = useState({ user_id: 1, title: '', due_date: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAssignment(form);
    setForm({ ...form, title: '', due_date: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Assignment Title"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          name="due_date"
          type="date"
          value={form.due_date}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          Add Assignment
        </button>
      </div>
    </form>
  );
}