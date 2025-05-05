import bcrypt from 'bcrypt';

export const createUsersTable = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const createUser = async (db, name, email, password) => {
  const hashed = await bcrypt.hash(password, 10);
  await db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',  // ← ✅ Include password
    name, email, hashed
  );
};

export const findUserByName = async (db, username) => {
  return db.get('SELECT * FROM users WHERE name = ?', username);
};

export const resetUserPassword = async (db, name, email, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  await db.run(
    'UPDATE users SET password = ? WHERE name = ? AND email = ?',
    hashed, name, email
  );
};
