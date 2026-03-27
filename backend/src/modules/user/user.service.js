const prisma = require('../../shared/config/prisma');

const getProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, phone: true, role: true, status: true, flat: true, society: true }
  });
};

const updateProfile = async (userId, data) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { name: data.name, phone: data.phone }
  });
};

const getPendingUsers = async (societyId) => {
  return await prisma.user.findMany({
    where: { societyId, status: 'PENDING' },
    select: { id: true, name: true, email: true, role: true, createdAt: true, flat: true }
  });
};

const approveUser = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status: 'APPROVED' }
  });
};

const rejectUser = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status: 'REJECTED' }
  });
};

const getSocietyContacts = async (societyId) => {
  return await prisma.user.findMany({
    where: { societyId, status: 'APPROVED' },
    select: { id: true, name: true, phone: true, role: true, flat: true }
  });
};

const saveFcmToken = async (userId, token) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { fcmToken: token }
  });
};

module.exports = { getProfile, updateProfile, getPendingUsers, approveUser, rejectUser, getSocietyContacts, saveFcmToken };