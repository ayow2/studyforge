import { useEffect, useState } from 'react';
import { getAssignments, toggleAssignment } from '../services/api';

export default function AssignmentList({ userId }) {
  const [assignments, setAssignments] = useState([]);

  const loadAssignments = () => {
    getAssignments(userId).then(setAssignments);
  };

  useEffect(() => {
    loadAssignments();
  }, [userId]);

  const handleToggle = async (id) => {
    await toggleAssignment(id);
    loadAssignments();
  };

  const isOverdue = (due) => new Date(due) < new Date();

  return (
    <div className="mt-6 bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Your Assignments</h2>
      {assignments.length === 0 && <p>No assignments yet.</p>}
      <ul className="space-y-2">
        {assignments.map(a => (
          <li key={a.id} className={`p-3 rounded border flex justify-between items-center
            ${isOverdue(a.due_date) && !a.completed ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}>
            <div>
              <div className="font-medium">{a.title}</div>
              <div className="text-sm text-gray-600">
                Due: {new Date(a.due_date).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={() => handleToggle(a.id)}
              className={`px-3 py-1 rounded ${
                a.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              {a.completed ? '✓ Done' : 'Mark Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
