import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // ─── Clean up existing data ───────────────────────────────────────────────
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await prisma.user.createManyAndReturn({
    data: [
      { name: 'Admin Utama', username: 'admin', password: hashedPassword },
      { name: 'Budi Santoso', username: 'budi', password: hashedPassword },
      { name: 'Siti Rahayu', username: 'siti', password: hashedPassword },
    ],
  });

  console.log(`✅ Created ${users.length} users`);

  // ─── Classes ──────────────────────────────────────────────────────────────
  const classes = await prisma.class.createManyAndReturn({
    data: [
      { name: 'Kelas 1A' },
      { name: 'Kelas 1B' },
      { name: 'Kelas 2A' },
      { name: 'Kelas 2B' },
      { name: 'Kelas 3A' },
    ],
  });

  console.log(`✅ Created ${classes.length} classes`);

  // ─── Parents ──────────────────────────────────────────────────────────────
  const parents = await prisma.parent.createManyAndReturn({
    data: [
      { name: 'Ahmad Fauzi' },
      { name: 'Dewi Kusuma' },
      { name: 'Rahmat Hidayat' },
      { name: 'Sri Mulyani' },
      { name: 'Hendra Wijaya' },
      { name: 'Ningsih Pratiwi' },
      { name: 'Bambang Sutrisno' },
      { name: 'Rina Wati' },
    ],
  });

  console.log(`✅ Created ${parents.length} parents`);

  // ─── Students ─────────────────────────────────────────────────────────────
  const studentData = [
    // Kelas 1A
    { name: 'Aldi Fauzi',       classId: classes[0].id, parentId: parents[0].id },
    { name: 'Bella Kusuma',     classId: classes[0].id, parentId: parents[1].id },
    { name: 'Candra Hidayat',   classId: classes[0].id, parentId: parents[2].id },
    { name: 'Dina Mulyani',     classId: classes[0].id, parentId: parents[3].id },
    // Kelas 1B
    { name: 'Eko Wijaya',       classId: classes[1].id, parentId: parents[4].id },
    { name: 'Fitri Pratiwi',    classId: classes[1].id, parentId: parents[5].id },
    { name: 'Galih Sutrisno',   classId: classes[1].id, parentId: parents[6].id },
    { name: 'Hana Wati',        classId: classes[1].id, parentId: parents[7].id },
    // Kelas 2A
    { name: 'Ilham Setiawan',   classId: classes[2].id },
    { name: 'Jihan Permata',    classId: classes[2].id },
    // Kelas 2B
    { name: 'Krisna Putra',     classId: classes[3].id },
    { name: 'Laila Sari',       classId: classes[3].id },
    // Kelas 3A
    { name: 'Maulana Rahman',   classId: classes[4].id },
    { name: 'Nadia Safitri',    classId: classes[4].id },
  ];

  const students = await prisma.student.createManyAndReturn({
    data: studentData,
  });

  console.log(`✅ Created ${students.length} students`);

  // ─── Teachers ─────────────────────────────────────────────────────────────
  const teacherData = [
    { name: 'Pak Agus Hermawan',  classId: classes[0].id },
    { name: 'Bu Lestari Ningrum', classId: classes[1].id },
    { name: 'Pak Teguh Santoso',  classId: classes[2].id },
    { name: 'Bu Rini Astuti',     classId: classes[3].id },
    { name: 'Pak Yusuf Basuki',   classId: classes[4].id },
  ];

  const teachers = await prisma.teacher.createManyAndReturn({
    data: teacherData,
  });

  console.log(`✅ Created ${teachers.length} teachers`);

  console.log('\n🎉 Seeding complete!');
  console.log('──────────────────────────────────');
  console.log(`  Users    : ${users.length}`);
  console.log(`  Classes  : ${classes.length}`);
  console.log(`  Parents  : ${parents.length}`);
  console.log(`  Students : ${students.length}`);
  console.log(`  Teachers : ${teachers.length}`);
  console.log('──────────────────────────────────');
  console.log('\n🔑 Login credentials (all users):');
  console.log('  Password : password123');
  users.forEach((u) => console.log(`  username : ${u.username} → ${u.name}`));
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
