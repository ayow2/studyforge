import { useState, useEffect } from 'react';
import { createAssignment, updateAssignment } from '../services/api';

/**
 * AssignmentForm Component
 *
 * A form component for creating or updating assignments. It allows users to input
 * assignment details such as title, due date, grade, and completion status.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object|null} [props.initialData=null] - Initial data for the form, used for editing an existing assignment.
 * @param {Function} [props.onSave=() => {}] - Callback function triggered after the form is successfully submitted.
 * @param {number} props.userId - The ID of the user associated with the assignment.
 *
 * @returns {JSX.Element} The rendered AssignmentForm component.
 *
 * @example
 * <AssignmentForm
 *   initialData={{ id: 1, title: 'Math Homework', due_date: '2023-10-01', completed: 1, grade: 95 }}
 *   onSave={() => console.log('Assignment saved!')}
 *   userId={123}
 * />
 */
export default function AssignmentForm({ initialData = null, onSave = () => {}, userId }) {
  const [form, setForm] = useState({
    user_id: userId,  // ← dynamically assigned!  
    title: '',
    due_date: '',
    completed: 0,
    grade: null
  });

  useEffect(() => {
    if (initialData) setForm({ ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updateAssignment(form.id, form);
    } else {
      await createAssignment(form);
    }
    onSave();
    setForm({ user_id: userId, title: '', due_date: '', completed: 0, grade: null });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="number"
          name="grade"
          value={form.grade ?? ''}
          onChange={handleChange}
          placeholder="Grade"
          min="0"
          max="100"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            name="completed"
            checked={!!form.completed}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>Completed</span>
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {form.id ? 'Update' : 'Add'} Assignment
        </button>
      </div>
    </form>
  );
}
