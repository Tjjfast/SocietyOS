const router = require('express').Router();
const controller = require('./user.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { authorize } = require('../../shared/middleware/rbac.middleware');

router.get('/me', authenticate, controller.getProfile);
router.patch('/me', authenticate, controller.updateProfile);
router.post('/fcm-token', authenticate, controller.saveFcmToken);
router.get('/contacts', authenticate, controller.getContacts);
router.get('/pending', authenticate, authorize('ADMIN'), controller.getPending);
router.patch('/:id/approve', authenticate, authorize('ADMIN'), controller.approve);
router.patch('/:id/reject', authenticate, authorize('ADMIN'), controller.reject);

module.exports = router;