const express = require('express');
const cors = require('cors');
const authRoutes = require('./modules/auth/auth.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
// Test routes for RBAC
const { authenticate } = require('./shared/middleware/auth.middleware');
const { authorize } = require('./shared/middleware/rbac.middleware');

app.get('/api/test/admin', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, message: `Hello Admin ${req.user.id}` });
});

app.get('/api/test/resident', authenticate, authorize('RESIDENT', 'ADMIN'), (req, res) => {
  res.json({ success: true, message: `Hello ${req.user.role}` });
});


module.exports = app;