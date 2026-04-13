const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a default Society
  const society = await prisma.society.upsert({
    where: { id: 'default-society-id' },
    update: {},
    create: {
      id: 'default-society-id',
      name: 'Skyline Heights',
      address: '123 Tech Park, Bangalore',
      zipCode: '560001',
    },
  });

  // 2. Create a default Admin user
  const adminPassword = 'adminpassword123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@societyos.com' },
    update: {},
    create: {
      email: 'admin@societyos.com',
      password: hashedPassword,
      name: 'System Admin',
      phone: '9876543210',
      role: 'ADMIN',
      status: 'APPROVED',
      societyId: society.id,
    },
  });

  console.log('Seed completed successfully:');
  console.log(`Admin Email: ${admin.email}`);
  console.log(`Admin Password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
