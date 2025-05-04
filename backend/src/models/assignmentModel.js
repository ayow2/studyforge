export const createAssignmentsTable = async (db) => {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS assignments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        due_date TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        grade INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);
  };
  