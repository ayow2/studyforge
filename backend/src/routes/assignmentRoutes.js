import express from 'express';
import { calculatePointsForCompletion, updateStreak } from '../utils/scoreUtils.js';
import { initDB } from '../../db/database.js';
import { updateAssignment, deleteAssignment } from '../models/assignmentModel.js';
import { authenticateToken } from '../middleware/auth.js';


/**
 * Defines routes for managing assignments, including creating, retrieving, updating, 
 * toggling completion status, grading, and deleting assignments. Also handles scoring 
 * and streak updates based on assignment completion and grading.
 *
 * @param {Object} db - The database instance for executing queries.
 * @returns {import('express').Router} - The configured Express router for assignment routes.
 *
 * Routes:
 * - POST /: Creates a new assignment.
 *   - Requires: `user_id`, `title`, `due_date` in the request body.
 *   - Middleware: `authenticateToken`.
 *
 * - GET /:user_id: Retrieves all assignments for a specific user, ordered by due date.
 *   - Requires: `user_id` as a URL parameter.
 *   - Middleware: `authenticateToken`.
 *
 * - PATCH /:id/toggle: Toggles the completion status of an assignment.
 *   - Requires: `id` as a URL parameter.
 *   - Middleware: `authenticateToken`.
 *   - Updates user scores and streaks if the assignment is marked as completed.
 *
 * - PATCH /:id/grade: Updates the grade of an assignment.
 *   - Requires: `id` as a URL parameter, `grade` in the request body.
 *   - Middleware: `authenticateToken`.
 *   - Updates user scores and streaks based on the grade.
 *
 * - PUT /:id: Updates an assignment with new data.
 *   - Requires: `id` as a URL parameter, updated data in the request body.
 *   - Middleware: `authenticateToken`.
 *
 * - DELETE /:id: Deletes an assignment.
 *   - Requires: `id` as a URL parameter.
 */
const assignmentRoutes = (db) => {
  const router = express.Router();

  router.post('/', authenticateToken, async (req, res) => {
    const { user_id, title, due_date } = req.body;
    try {
      const stmt = await db.prepare('INSERT INTO assignments (user_id, title, due_date) VALUES (?, ?, ?)');
      await stmt.run(user_id, title, due_date);
      res.status(201).json({ message: 'Assignment added' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:user_id', authenticateToken, async (req, res) => {
    const { user_id } = req.params;
    try {
      const assignments = await db.all(
        'SELECT * FROM assignments WHERE user_id = ? ORDER BY due_date ASC',
        user_id
      );
      res.json(assignments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

router.patch('/:id/toggle', authenticateToken, async (req, res) => {
  const db = await initDB();
  const { id } = req.params;

  try {
    const assignment = await db.get('SELECT * FROM assignments WHERE id = ?', id);
    const newValue = assignment.completed ? 0 : 1;

    await db.run('UPDATE assignments SET completed = ? WHERE id = ?', newValue, id);

    if (newValue === 1) {
      const points = calculatePointsForCompletion(assignment.due_date);
      const scoreRow = await db.get('SELECT * FROM scores WHERE user_id = ?', assignment.user_id);
      const { updatedStreak, newLastActive } = updateStreak(scoreRow?.last_active);
      let newPoints = (scoreRow?.points || 0) + points;
      let newStreak = 1;

      if (updatedStreak === 'increment') newStreak = (scoreRow?.streak || 0) + 1;
      else if (updatedStreak === 'same') newStreak = scoreRow?.streak || 1;

      if (scoreRow) {
        await db.run(
          'UPDATE scores SET points = ?, streak = ?, last_active = ? WHERE user_id = ?',
          newPoints, newStreak, newLastActive, assignment.user_id
        );
      } else {
        await db.run(
          'INSERT INTO scores (user_id, points, streak, last_active) VALUES (?, ?, ?, ?)',
          assignment.user_id, newPoints, newStreak, newLastActive
        );
      }
    }

    res.json({ updated: true, completed: newValue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  
  router.patch('/:id/grade', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;
  
    try {
      await db.run(
        'UPDATE assignments SET grade = ? WHERE id = ?',
        grade,
        id
      );

      const assignment = await db.get('SELECT * FROM assignments WHERE id = ?', id);
      const points = calculatePointsForGrade(grade);
      const scoreRow = await db.get('SELECT * FROM scores WHERE user_id = ?', assignment.user_id);
      const { updatedStreak, newLastActive } = updateStreak(scoreRow?.last_active);

      let newPoints = (scoreRow?.points || 0) + points;
      let newStreak = 1;

      if (updatedStreak === 'increment') newStreak = (scoreRow?.streak || 0) + 1;
      else if (updatedStreak === 'same') newStreak = scoreRow?.streak || 1;

      if (scoreRow) {
        await db.run(
          'UPDATE scores SET points = ?, streak = ?, last_active = ? WHERE user_id = ?',
          newPoints, newStreak, newLastActive, assignment.user_id
        );
      } else {
        await db.run(
          'INSERT INTO scores (user_id, points, streak, last_active) VALUES (?, ?, ?, ?)',
          assignment.user_id, newPoints, newStreak, newLastActive
        );
      }

      console.log('Assignment:', assignment);
      console.log('Points earned:', points);
      console.log('Existing score:', scoreRow);

      res.json({ updated: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await updateAssignment(db, id, data);
      res.json({ message: 'Assignment updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await deleteAssignment(db, id);
      res.json({ message: 'Assignment deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  return router;
};



export default assignmentRoutes;
