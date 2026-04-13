const prisma = require('../../shared/config/prisma');

const listFlats = async (societyId) => {
  return await prisma.flat.findMany({
    where: { societyId },
    include: {
      _count: { select: { users: true } },
      users: { select: { id: true, name: true, email: true, phone: true, role: true, status: true } }
    },
    orderBy: [{ floor: 'asc' }, { number: 'asc' }]
  });
};

const createFlat = async (societyId, data) => {
  const existing = await prisma.flat.findFirst({
    where: { number: data.number, societyId }
  });
  if (existing) throw new Error('Flat number already exists in this society');

  return await prisma.flat.create({
    data: {
      number: data.number,
      floor: data.floor,
      societyId
    }
  });
};

const updateFlat = async (societyId, flatId, data) => {
  const flat = await prisma.flat.findUnique({ where: { id: flatId } });
  if (!flat || flat.societyId !== societyId) throw new Error('Flat not found');

  const allowed = {};
  if (data.number) allowed.number = data.number;
  if (data.floor !== undefined) allowed.floor = data.floor;

  return await prisma.flat.update({
    where: { id: flatId },
    data: allowed
  });
};

const deleteFlat = async (societyId, flatId) => {
  const flat = await prisma.flat.findUnique({ where: { id: flatId } });
  if (!flat || flat.societyId !== societyId) throw new Error('Flat not found');

  // Check if flat has residents
  const residents = await prisma.user.count({ where: { flatId } });
  if (residents > 0) throw new Error('Cannot delete flat with active residents');

  return await prisma.flat.delete({ where: { id: flatId } });
};

module.exports = { listFlats, createFlat, updateFlat, deleteFlat };
