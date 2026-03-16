const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../shared/config/prisma');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, societyId: user.societyId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const register = async ({ name, email, password, phone, role, societyId, flatId }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already registered');

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name, email,
      password: hashed,
      phone, role,
      societyId, flatId,
      status: role === 'ADMIN' ? 'APPROVED' : 'PENDING'
    }
  });

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status } };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  if (user.status === 'PENDING') throw new Error('Account pending admin approval');
  if (user.status === 'REJECTED') throw new Error('Account rejected');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = generateToken(user);
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { register, login };