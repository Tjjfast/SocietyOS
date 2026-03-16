const { Pool } = require('pg');
const mongoose = require('mongoose');

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10
});

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

const connectPG = async () => {
  try {
    await pgPool.query({
      text: 'SELECT NOW()',
      simple: true
    });
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err);
    process.exit(1);
  }
};

module.exports = { pgPool, connectMongo, connectPG };