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
  
  export const updateAssignment = async (db, id, { title, due_date, completed, grade }) => {
    await db.run(
      `UPDATE assignments SET title = ?, due_date = ?, completed = ?, grade = ? WHERE id = ?`,
      title, due_date, completed ?? 0, grade ?? null, id
    );
  };
  
  export const deleteAssignment = async (db, id) => {
    await db.run(`DELETE FROM assignments WHERE id = ?`, id);
  };
  