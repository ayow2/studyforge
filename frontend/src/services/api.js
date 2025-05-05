const API_BASE = 'http://localhost:3001/api';

export const createUser = async (user) =>
  fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

export const createAssignment = async (assignment) =>
  fetch(`${API_BASE}/assignments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assignment)
  });

  export const getAssignments = async (user_id) => {
    const res = await fetch(`${API_BASE}/assignments/${user_id}`);
    return res.json();
  };
  
  export const toggleAssignment = async (assignmentId) => {
    const res = await fetch(`${API_BASE}/assignments/${assignmentId}/toggle`, {
      method: 'PATCH'
    });
    return res.json();
  };
  
  export const getGradeAverage = async (userId) => {
    const res = await fetch(`${API_BASE}/users/${userId}/grade-average`);
    return res.json();
  };
  
  export const updateAssignmentGrade = async (id, grade) => {
    const res = await fetch(`${API_BASE}/assignments/${id}/grade`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grade })
    });
    return res.json();
  };
  
  export const updateAssignment = async (id, data) => {
    const res = await fetch(`${API_BASE}/assignments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  };
  