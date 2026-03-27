const { Queue } = require('bullmq');
const connection = { url: process.env.REDIS_URL };

const notificationQueue = new Queue('notifications', { connection });

module.exports = { notificationQueue };