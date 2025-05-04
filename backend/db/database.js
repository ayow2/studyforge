import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDB = async () => {
  return open({
    filename: './db/studyforge.sqlite',
    driver: sqlite3.Database
  });
};
