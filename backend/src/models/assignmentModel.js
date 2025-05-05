export const createAssignmentsTable = async (db) => {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      due_date TEXT,
      completed INTEGER DEFAULT 0,
      grade INTEGER
      );
    `);
  };
  