const { validate } = require('../../shared/middleware/validate.middleware');

const registerSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 100 },
  email: { required: true, type: 'email' },
  password: { required: true, type: 'string', minLength: 6 },
  phone: { type: 'string' },
  role: { required: true, enum: ['RESIDENT', 'SECURITY'] },
  societyId: { required: true, type: 'string' },
};

const loginSchema = {
  email: { required: true, type: 'email' },
  password: { required: true, type: 'string' },
};

module.exports = {
  validateRegister: validate(registerSchema),
  validateLogin: validate(loginSchema),
};
