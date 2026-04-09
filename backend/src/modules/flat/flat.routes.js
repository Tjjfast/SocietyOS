const router = require('express').Router();
const controller = require('./flat.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { authorize } = require('../../shared/middleware/rbac.middleware');

router.get('/', authenticate, controller.listFlats); // ADMIN + RESIDENT
router.post('/', authenticate, authorize('ADMIN'), controller.createFlat);
router.patch('/:id', authenticate, authorize('ADMIN'), controller.updateFlat);
router.delete('/:id', authenticate, authorize('ADMIN'), controller.deleteFlat);

module.exports = router;
