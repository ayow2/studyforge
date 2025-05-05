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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <div className="flex gap-2 items-center">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Assignment Title"
          className="px-3 py-2 border border-gray-300 rounded w-1/2"
          required
        />
        <input
          name="due_date"
          type="date"
          value={form.due_date}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Assignment
        </button>
      </div>
    </form>
  );
}
