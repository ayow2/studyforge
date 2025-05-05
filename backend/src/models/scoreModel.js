export const createScoreTable = async (db) => {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS scores (
        user_id INTEGER PRIMARY KEY,
        points INTEGER DEFAULT 0,
        streak INTEGER DEFAULT 0,
        last_active TEXT
      );
    `);
  };
  