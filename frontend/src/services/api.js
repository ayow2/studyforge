const API_BASE = 'http://localhost:3001/api';

const getToken = () => localStorage.getItem('token');

export const createUser = async (user) =>
  fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

export const createAssignment = async (assignment) =>
  fetch(`${API_BASE}/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(assignment)
  });

export const getAssignments = async (user_id) => {
  const res = await fetch(`${API_BASE}/assignments/${user_id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return res.json();
};

export const toggleAssignment = async (assignmentId) => {
  const res = await fetch(`${API_BASE}/assignments/${assignmentId}/toggle`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
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
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ grade })
  });
  return res.json();
};

export const updateAssignment = async (id, assignment) => {
  await fetch(`${API_BASE}/assignments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(assignment)
  });
};

export const deleteAssignment = async (id) => {
  await fetch(`${API_BASE}/assignments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
};
