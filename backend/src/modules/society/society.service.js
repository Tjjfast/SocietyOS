const prisma = require('../../shared/config/prisma');

const listSocieties = async () => {
  return await prisma.society.findMany({
    select: { id: true, name: true, address: true, zipCode: true },
    orderBy: { name: 'asc' }
  });
};

const getSociety = async (id) => {
  const society = await prisma.society.findUnique({
    where: { id },
    include: {
      _count: { select: { flats: true, users: true } }
    }
  });
  if (!society) throw new Error('Society not found');
  return society;
};

const updateSociety = async (id, data) => {
  const allowed = {};
  if (data.name) allowed.name = data.name;
  if (data.address) allowed.address = data.address;
  if (data.zipCode) allowed.zipCode = data.zipCode;
  if (data.logo) allowed.logo = data.logo;

  return await prisma.society.update({
    where: { id },
    data: allowed
  });
};

module.exports = { listSocieties, getSociety, updateSociety };
