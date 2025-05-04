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

  return router;
};

export default userRoutes;
