const express = require('express');
const router = express.Router();
const passController = require('./pass.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { authorize } = require('../../shared/middleware/rbac.middleware');

router.post('/', authenticate, authorize('RESIDENT'), passController.createPass);
router.get('/', authenticate, authorize('RESIDENT'), passController.getMyPasses);
router.get('/lookup', authenticate, authorize('SECURITY'), passController.lookupRecurring);
router.get('/qr/:token', authenticate, authorize('SECURITY'), passController.validateQrToken);
router.get('/:id', authenticate, authorize('RESIDENT'), passController.getPassDetail);
router.delete('/:id', authenticate, authorize('RESIDENT'), passController.revokePass);

module.exports = router;
