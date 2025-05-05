export const API_BASE = 'https://studyforge-cb7g.onrender.com/api';

const getToken = () => localStorage.getItem('token');

/**
 * Sends a POST request to create a new user.
 *
 * @param {Object} user - The user data to be sent in the request body.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} [user.password] - The password of the user (optional).
 * @returns {Promise<Response>} A promise that resolves to the fetch API Response object.
 */
export const createUser = async (user) =>
  fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

/**
 * Sends a POST request to create a new assignment.
 *
 * @param {Object} assignment - The assignment data to be created.
 * @returns {Promise<Response>} A promise that resolves to the response of the fetch request.
 */
export const createAssignment = async (assignment) =>
  fetch(`${API_BASE}/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(assignment)
  });

/**
 * Fetches assignments for a specific user.
 *
 * @param {string} user_id - The ID of the user whose assignments are to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the JSON response containing the assignments.
 * @throws {Error} If the fetch request fails or the response cannot be parsed as JSON.
 */
export const getAssignments = async (user_id) => {
  const res = await fetch(`${API_BASE}/assignments/${user_id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return res.json();
};

/**
 * Toggles the state of an assignment by sending a PATCH request to the API.
 *
 * @async
 * @function toggleAssignment
 * @param {string} assignmentId - The unique identifier of the assignment to toggle.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the API.
 * @throws {Error} If the fetch request fails or the response cannot be parsed as JSON.
 */
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

/**
 * Updates the grade of an assignment by its ID.
 *
 * @param {string} id - The ID of the assignment to update.
 * @param {number} grade - The new grade to assign to the assignment.
 * @returns {Promise<Object>} A promise that resolves to the response JSON object.
 *
 * @throws {Error} Throws an error if the fetch request fails.
 */
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

/**
 * Updates an assignment with the given ID by sending a PUT request to the API.
 *
 * @param {string} id - The unique identifier of the assignment to update.
 * @param {Object} assignment - The updated assignment data to be sent in the request body.
 * @returns {Promise<void>} A promise that resolves when the update operation is complete.
 */
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
