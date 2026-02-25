import prisma from '@/lib/prisma';

export async function getDashboardClasses() {
  return prisma.class.findMany({
    include: {
      students: true,
      teachers: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getDashboardParents() {
  return prisma.parent.findMany({
    include: {
      student: {
        include: {
          class: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}
