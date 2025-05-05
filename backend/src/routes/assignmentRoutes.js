import express from 'express';

const assignmentRoutes = (db) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { user_id, title, due_date } = req.body;
    try {
      const stmt = await db.prepare('INSERT INTO assignments (user_id, title, due_date) VALUES (?, ?, ?)');
      await stmt.run(user_id, title, due_date);
      res.status(201).json({ message: 'Assignment added' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:user_id', async (req, res) => {
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
  
  router.patch('/:id/toggle', async (req, res) => {
    const { id } = req.params;
    try {
      const assignment = await db.get('SELECT completed FROM assignments WHERE id = ?', id);
      const newValue = assignment.completed ? 0 : 1;
  
      await db.run('UPDATE assignments SET completed = ? WHERE id = ?', newValue, id);

      if (newValue === 1) {
        const points = calculatePointsForCompletion(assignment.due_date);
        const scoreRow = await db.get('SELECT * FROM scores WHERE user_id = ?', assignment.user_id);
      
        const today = new Date().toDateString();
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
  
  router.patch('/:id/grade', async (req, res) => {
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
      const today = new Date().toDateString();

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

      res.json({ updated: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  return router;
};

export default assignmentRoutes;
