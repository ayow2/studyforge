import { useEffect, useState } from 'react';
import {
  getAssignments,
  toggleAssignment,
  updateAssignmentGrade,
  deleteAssignment
} from '../services/api';
import AssignmentForm from './AssignmentForm';

export default function AssignmentList({ userId }) {
  const [assignments, setAssignments] = useState([]);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const loadAssignments = () => {
    getAssignments(userId).then(setAssignments);
  };

  useEffect(() => {
    loadAssignments();
  }, [userId]);

  const handleEdit = (assignment) => {
    console.log("Edit clicked:", assignment); 
    setEditingAssignment(assignment);
  }
  const handleDelete = async (id) => {
    console.log("Delete clicked: id", id);
    await deleteAssignment(id);
    loadAssignments();
  };
  const handleSave = () => {
    setEditingAssignment(null);
    loadAssignments();
  };

  return (
    <div className="space-y-6 mt-8">
      {editingAssignment && (
        <AssignmentForm initialData={editingAssignment} onSave={handleSave} />
      )}
      {assignments.map((a) => (
        <div key={a.id} className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-100">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-500">Due: {a.due_date}</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!a.completed}
              onChange={() => toggleAssignment(a.id).then(loadAssignments)}
              className="w-4 h-4"
            />
            <input
              type="number"
              min="0"
              max="100"
              defaultValue={a.grade}
              onBlur={(e) => updateAssignmentGrade(a.id, e.target.value).then(loadAssignments)}
              className="w-20 px-2 py-1 border border-gray-300 rounded"
            />
            <button onClick={() => handleEdit(a)} className="text-blue-600 hover:underline">Edit</button>
            <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:underline">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
