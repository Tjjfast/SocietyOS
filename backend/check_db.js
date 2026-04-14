const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const user = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
    select: { email: true, societyId: true }
  });
  console.log('--- FOUND ADMIN ---');
  console.log('Email:', user?.email);
  console.log('SocietyId:', user?.societyId);
  const societies = await prisma.society.findMany();
  console.log('--- SOCIETIES IN DB ---');
  societies.forEach(s => console.log(`ID: ${s.id} | Name: ${s.name}`));
}

check().finally(() => prisma.$disconnect());
