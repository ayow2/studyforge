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
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-4">
      <input name="title" value={form.title} onChange={handleChange}
        placeholder="Assignment Title" className="input" required />
      <input name="due_date" type="date" value={form.due_date} onChange={handleChange}
        className="input" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Assignment
      </button>
    </form>
  );
}
