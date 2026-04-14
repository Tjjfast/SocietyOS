const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with testing data...');

  // 1. Create a default Society
  const society = await prisma.society.upsert({
    where: { id: 'default-society-id' },
    update: {},
    create: {
      id: 'default-society-id',
      name: 'Obsidian Horizon Estate',
      address: '123 Tech Park, Bangalore',
      zipCode: '560001',
    },
  });

  // 2. Hash default passwords securely
  console.log('Hashing passwords...');
  const defaultPassword = 'password123';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);
  
  // Create admin password specifically matching the UI dev expectations
  const adminPassword = 'admin';
  const adminHashed = await bcrypt.hash(adminPassword, 10);

  // 3. Create Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@societyos.cloud' },
    update: {
      password: adminHashed // Ensure it stays synced during testing
    },
    create: {
      email: 'admin@societyos.cloud',
      password: adminHashed,
      name: 'System Admin',
      phone: '9876543210',
      role: 'ADMIN',
      status: 'APPROVED',
      societyId: society.id,
    },
  });
  
  // 4. Seed Flats
  const flatsData = [
    { number: 'A-101', floor: 1 },
    { number: 'A-102', floor: 1 },
    { number: 'B-201', floor: 2 },
    { number: 'B-202', floor: 2 },
    { number: 'C-305', floor: 3 },
  ];
  
  const flats = [];
  for (const f of flatsData) {
    const flat = await prisma.flat.upsert({
      where: {
        number_societyId: {
          number: f.number,
          societyId: society.id
        }
      },
      update: {},
      create: {
        number: f.number,
        floor: f.floor,
        societyId: society.id
      }
    });
    flats.push(flat);
  }

  // 5. Create Guards
  const guard = await prisma.user.upsert({
    where: { email: 'guard1@societyos.cloud' },
    update: {},
    create: {
      email: 'guard1@societyos.cloud',
      password: hashedPassword,
      name: 'John Security',
      phone: '8765432109',
      role: 'SECURITY',
      status: 'APPROVED',
      societyId: society.id,
    }
  });

  // 6. Create Residents
  const resident = await prisma.user.upsert({
    where: { email: 'resident1@societyos.cloud' },
    update: {},
    create: {
      email: 'resident1@societyos.cloud',
      password: hashedPassword,
      name: 'Alice Resident',
      phone: '7654321098',
      role: 'RESIDENT',
      status: 'APPROVED',
      societyId: society.id,
      flatId: flats[0].id
    }
  });

  // 7. Re-create a Notice
  await prisma.notice.deleteMany({
    where: { societyId: society.id } // Clear existing to prevent duplicates during multiple seeds
  });
  
  await prisma.notice.create({
    data: {
      title: 'Welcome to SocietyOS Live Integrations',
      body: 'This notice was automatically seeded by Prisma. The backend is now fully operational!',
      category: 'GENERAL',
      priority: 'NORMAL',
      authorId: admin.id,
      societyId: society.id
    }
  });
  
  await prisma.notice.create({
    data: {
      title: 'Pool Maintenance This Weekend',
      body: 'The main swimming pool will be closed on Sunday 12th for regular maintenance protocols.',
      category: 'MAINTENANCE',
      priority: 'HIGH',
      authorId: admin.id,
      societyId: society.id
    }
  });

  console.log('Seed completed successfully!');
  console.log('----------------------------');
  console.log(`Admin Login -> admin@societyos.cloud / admin`);
  console.log(`Guard Login -> guard1@societyos.cloud / password123`);
  console.log(`Resident Login -> resident1@societyos.cloud / password123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
