const { notificationQueue } = require('../../shared/config/queue');

const createEntryRequest = async ({ visitorName, visitorPhone, purpose, userId }, io) => {
  const entry = await prisma.entryRequest.create({
    data: { visitorName, visitorPhone, purpose, userId, status: 'PENDING' }
  });

  // Push to BullMQ queue
  await notificationQueue.add('entry:request', {
    type: 'entry:request',
    userId,
    payload: { message: `${visitorName} is at the gate`, entry }
  });

  // Also emit socket for real-time (instant)
  if (io) {
    io.to(userId).emit('entry:new', {
      message: `${visitorName} is at the gate`,
      entry
    });
  }

  return entry;
};