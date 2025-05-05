import { useEffect, useState } from 'react';
import { getAssignments, toggleAssignment, updateAssignmentGrade } from '../services/api';

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

  const handleGradeChange = async (id, value) => {
    const grade = parseInt(value, 10);
    if (!isNaN(grade) && grade >= 0 && grade <= 100) {
      await updateAssignmentGrade(id, grade);
      loadAssignments();
    }
  };

  const isOverdue = (dueDateStr, completed) => {
    const dueDate = new Date(dueDateStr);
    const today = new Date();
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return !completed && dueDate < today;
  };

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Your Assignments</h2>
      {assignments.length === 0 && (
        <p className="text-gray-500 italic">No assignments yet. Add one above!</p>
      )}
      <ul className="space-y-3">
        {assignments.map(a => {
          const overdue = isOverdue(a.due_date, a.completed);
          return (
            <li
              key={a.id}
              className={`p-4 rounded-lg flex justify-between items-center transition ${
                overdue
                  ? 'border border-red-400 bg-red-100 text-red-800'
                  : 'bg-white shadow border border-gray-200'
              }`}
            >
              <div>
                <div className="font-semibold text-lg">{a.title}</div>
                <div className="text-sm text-gray-600">
                  Due: {new Date(a.due_date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={a.grade ?? ''}
                  onChange={(e) => handleGradeChange(a.id, e.target.value)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                  placeholder="%"
                  title="Enter grade"
                />
                <button
                  onClick={() => handleToggle(a.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    a.completed
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {a.completed ? '✓ Done' : 'Mark Done'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
