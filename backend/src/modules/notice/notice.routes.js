const express = require('express');
const router = express.Router();
const controller = require('./notice.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { authorize } = require('../../shared/middleware/rbac.middleware');

router.get('/', authenticate, controller.getAll);
router.post('/', authenticate, authorize('ADMIN'), controller.create);
router.patch('/:id', authenticate, authorize('ADMIN'), controller.update);
router.delete('/:id', authenticate, authorize('ADMIN'), controller.remove);
router.patch('/:id/pin', authenticate, authorize('ADMIN'), controller.togglePin);

module.exports = router;
