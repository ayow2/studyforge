import express from 'express';

const userRoutes = (db) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
      const stmt = await db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
      await stmt.run(name, email);
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:id/grade-average', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.get(
        'SELECT AVG(grade) as average FROM assignments WHERE user_id = ? AND grade IS NOT NULL',
        id
      );
      res.json({ average: result.average ?? 0 });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  

  router.get('/:id/score', async (req, res) => {
    const { id } = req.params;
    try {
      const score = await db.get(
        'SELECT points, streak FROM scores WHERE user_id = ?',
        id
      );
  
      if (!score) {
        return res.json({ points: 0, streak: 0 });
      }
  
      res.json(score);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  return router;
};

export default userRoutes;
