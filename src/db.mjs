import mongoose from "mongoose";
import env from 'dotenv'

env.config()

let db;
if (process.env.NODE_ENV !== 'test') {
  try {
    db = mongoose.connect(process.env.DB_URI, {});
  } catch (error) {
    console.error('Database connection error:', error);
  }

}

export default db;
