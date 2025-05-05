import AssignmentForm from '../components/AssignmentForm.jsx';
import AssignmentList from '../components/AssignmentList.jsx';
import GradeAverage from '../components/GradeAverage';
import ScorePanel from '../components/ScorePanel';
import { useState, useEffect } from 'react';
import { getAssignments } from '../services/api';


export default function Dashboard({ user, userId, onLogout }) {

  const [assignments, setAssignments] = useState([]);

  const loadAssignments = async () => {
    const data = await getAssignments(userId);
    setAssignments(data);
  };

  useEffect(() => {
    if (userId) loadAssignments();
  }, [userId]);

  const handleEdit = (assignment) => setEditingAssignment(assignment);

  const handleSave = () => {
    setEditingAssignment(null);
    loadAssignments();
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <button
        onClick={onLogout}
        className="absolute top-4 right-4 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>

      <p className="text-center text-sm text-gray-500 mb-4">
        Logged in as <span className="font-semibold">{user?.name}</span>
      </p>


      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          📘 StudyForge Dashboard
        </h1>
        <div className="space-y-10">
          <AssignmentForm userId={userId} onSave={loadAssignments} />
          <div className="border-t pt-6">
            <AssignmentList
              assignments={assignments}
              onReload={loadAssignments}
              editingAssignment={editingAssignment}
              onEdit={handleEdit}
              onSave={handleSave}
            />
            <ScorePanel userId={userId} />
            <GradeAverage userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
