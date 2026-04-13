const service = require('./notification.service');
const asyncHandler = require('../../shared/utils/asyncHandler');

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await service.getNotifications(req.user.id);
  res.json({ success: true, data: notifications });
});

const markAsRead = asyncHandler(async (req, res) => {
  await service.markAsRead(req.user.id, req.params.id);
  res.json({ success: true, message: 'Notification marked as read' });
});

const markAllAsRead = asyncHandler(async (req, res) => {
  await service.markAllAsRead(req.user.id);
  res.json({ success: true, message: 'All notifications marked as read' });
});

const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await service.getUnreadCount(req.user.id);
  res.json({ success: true, data: { count } });
});

module.exports = { getNotifications, markAsRead, markAllAsRead, getUnreadCount };
