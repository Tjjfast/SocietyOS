const cron = require('node-cron');
const prisma = require('../config/prisma');

const startPassExpiryCron = () => {
  // Run every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    try {
      const result = await prisma.pass.updateMany({
        where: {
          type: 'ONE_TIME',
          status: 'ACTIVE',
          expiresAt: { lt: new Date() }
        },
        data: { status: 'EXPIRED' }
      });

      if (result.count > 0) {
        console.log(`[Cron] Expired ${result.count} passes`);
      }
    } catch (err) {
      console.error('[Cron] Pass expiry error:', err.message);
    }
  });

  console.log('[Cron] Pass expiry job scheduled (every 15 min)');
};

module.exports = { startPassExpiryCron };
