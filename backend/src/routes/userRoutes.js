import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByName, resetUserPassword } from '../models/userModel.js';

const SECRET = 'your-secret-key';

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

  router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      await createUser(db, name, email, password);
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
  router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
      const user = await findUserByName(db, name);
      if (!user) return res.status(401).json({ error: 'User not found' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: '1h' });
      res.json({ token });
      console.log("User:", user);
      console.log("Password:", password);
      console.log("Hash from DB:", user?.password);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.post('/reset-password', async (req, res) => {
    const { name, email, newPassword } = req.body;
  
    if (!name || !email || !newPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      await resetUserPassword(db, name, email, newPassword);
      res.json({ message: 'Password updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  /*
  router.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const user = await findUserByName(db, name);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (!password) {
        return res.status(400).json({ error: 'No password sent' });
      }
  
      if (!user.password) {
        return res.status(500).json({ error: 'User has no stored password' });
      }
  
      // Final confirmation
      return res.status(200).json({
        message: "Password ready for comparison",
        userPassword: user.password,
        submittedPassword: password
      });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
*/
  

  return router;
};

export default userRoutes;
