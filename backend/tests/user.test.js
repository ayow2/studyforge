import request from 'supertest';
import express from 'express';
import { initDB } from '../db/database.js';
import userRoutes from '../src/routes/userRoutes.js';

let app;
let db;

beforeAll(async () => {
  db = await initDB();
  app = express();
  app.use(express.json());
  app.use('/api/users', userRoutes(db));
});

test('POST /api/users creates a user', async () => {
  const response = await request(app).post('/api/users').send({
    name: 'Test Student',
    email: 'student@example.com'
  });
  expect(response.statusCode).toBe(201);
});
