const prisma = require('../../shared/config/prisma');

const getNotifications = async (userId) => {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
};

const markAsRead = async (userId, notificationId) => {
  return await prisma.notification.update({
    where: { id: notificationId, userId },
    data: { isRead: true }
  });
};

const markAllAsRead = async (userId) => {
  return await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true }
  });
};

const getUnreadCount = async (userId) => {
  return await prisma.notification.count({
    where: { userId, isRead: false }
  });
};

const createNotification = async ({ userId, type, title, body, metadata }) => {
  return await prisma.notification.create({
    data: { userId, type, title, body, metadata }
  });
};

module.exports = { getNotifications, markAsRead, markAllAsRead, getUnreadCount, createNotification };
