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
      res.json({ updated: true, completed: newValue });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  return router;
};

export default assignmentRoutes;
