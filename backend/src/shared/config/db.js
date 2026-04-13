const prisma = require('./prisma');

const connectPG = async () => {
  try {
    // Use Prisma to test the DB connection
    await prisma.$connect();
    console.log('PostgreSQL connected via Prisma');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectPG };