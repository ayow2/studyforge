import { useEffect, useState } from 'react';
import {
  getAssignments,
  toggleAssignment,
  updateAssignmentGrade,
  deleteAssignment
} from '../services/api';
import AssignmentForm from './AssignmentForm';

/**
 * AssignmentList Component
 *
 * This component renders a list of assignments with options to edit, delete, 
 * toggle completion, and update grades. It also displays an assignment form 
 * when an assignment is being edited.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.assignments - An array of assignment objects to display.
 * @param {Function} props.onReload - Callback function to reload the assignment list.
 * @param {Function} props.onEdit - Callback function to handle editing an assignment.
 * @param {Object|null} props.editingAssignment - The assignment currently being edited, or null if none.
 * @param {Function} props.onSave - Callback function to save the edited assignment.
 *
 * @returns {JSX.Element} The rendered AssignmentList component.
 */
export default function AssignmentList({ assignments, onReload, onEdit, editingAssignment, onSave }) {
  return (
    <div className="space-y-6 mt-8">
      {editingAssignment && (
        <AssignmentForm initialData={editingAssignment} onSave={onSave} />
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
              onChange={() => toggleAssignment(a.id).then(onReload)}
              className="w-4 h-4"
            />
            <input
              type="number"
              min="0"
              max="100"
              defaultValue={a.grade}
              onBlur={(e) => updateAssignmentGrade(a.id, e.target.value).then(onReload)}
              className="w-20 px-2 py-1 border border-gray-300 rounded"
            />
            <button onClick={() => onEdit(a)} className="text-blue-600 hover:underline">Edit</button>
            <button onClick={() => deleteAssignment(a.id).then(onReload)} className="text-red-600 hover:underline">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}


