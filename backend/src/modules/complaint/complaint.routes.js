const { upload } = require('../../shared/config/cloudinary');
const router = require('express').Router();
const controller = require('./complaint.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { authorize } = require('../../shared/middleware/rbac.middleware');

router.post('/', authenticate, authorize('RESIDENT'), controller.create);
router.get('/', authenticate, controller.getAll);
router.patch('/:id/status', authenticate, controller.updateStatus);
router.patch('/:id/assign', authenticate, authorize('ADMIN'), controller.assign);

module.exports = router;
router.post('/', authenticate, authorize('RESIDENT'), upload.single('image'), controller.create);