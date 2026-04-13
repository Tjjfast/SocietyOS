const router = require('express').Router();
const controller = require('./notification.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');

router.get('/', authenticate, controller.getNotifications);
router.get('/unread-count', authenticate, controller.getUnreadCount);
router.patch('/read-all', authenticate, controller.markAllAsRead);
router.patch('/:id/read', authenticate, controller.markAsRead);

module.exports = router;
