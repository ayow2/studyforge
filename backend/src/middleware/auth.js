import jwt from 'jsonwebtoken';

const SECRET = 'your-secret-key'; // Use same one from login

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Attach user info to request
    next();
  });
};
