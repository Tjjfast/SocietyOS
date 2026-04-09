const router = require('express').Router();
const controller = require('./society.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { authorize } = require('../../shared/middleware/rbac.middleware');

router.get('/', controller.listSocieties); // Public — for registration picker
router.get('/mine', authenticate, authorize('ADMIN'), controller.getSociety);
router.patch('/mine', authenticate, authorize('ADMIN'), controller.updateSociety);

module.exports = router;
