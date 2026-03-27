const { Worker } = require('bullmq');
const connection = { url: process.env.REDIS_URL };

const worker = new Worker('notifications', async (job) => {
  const { type, userId, payload } = job.data;
  console.log(`Processing notification job: ${type} for user ${userId}`);

  if (type === 'entry:request') {
    // FCM push will go here later
    console.log(`Notify ${userId}: ${payload.message}`);
  }

  if (type === 'complaint:updated') {
    console.log(`Notify ${userId}: complaint status → ${payload.status}`);
  }

}, { connection });

worker.on('completed', (job) => console.log(`Job ${job.id} done`));
worker.on('failed', (job, err) => console.error(`Job ${job.id} failed:`, err));

module.exports = worker;