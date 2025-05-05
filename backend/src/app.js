import express from 'express';
import dotenv from 'dotenv';
import { initDB } from '../db/database.js';
import { createUsersTable } from './models/userModel.js';
import { createAssignmentsTable } from './models/assignmentModel.js';
import { createScoreTable } from './models/scoreModel.js';
import userRoutes from './routes/userRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import cors from 'cors';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

/**
 * Initializes the application by setting up the database, creating necessary tables,
 * and configuring API routes. Starts the server on the specified port.
 *
 * @async
 * @function bootstrap
 * @returns {Promise<void>} Resolves when the application is fully initialized and the server is running.
 *
 * @throws {Error} Throws an error if database initialization or table creation fails.
 */
const bootstrap = async () => {
  const db = await initDB();
  await createUsersTable(db);
  await createAssignmentsTable(db);
  await createScoreTable(db);

  app.locals.db = db;

  app.use('/api/users', userRoutes(db));
  app.use('/api/assignments', assignmentRoutes(db));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

bootstrap();
