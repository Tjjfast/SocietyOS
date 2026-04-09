const router = require('express').Router();
const controller = require('./complaint.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { authorize } = require('../../shared/middleware/rbac.middleware');

router.post('/', authenticate, authorize('RESIDENT'), controller.create);
router.get('/mine', authenticate, authorize('RESIDENT'), controller.getMyComplaints);
router.get('/', authenticate, authorize('ADMIN'), controller.getAll);
router.patch('/:id/close', authenticate, authorize('ADMIN'), controller.close);

module.exports = router;