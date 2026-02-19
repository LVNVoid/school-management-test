'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getClasses() {
  return await prisma.class.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function createClass(formData: FormData) {
  const name = formData.get('name') as string;

  await prisma.class.create({
    data: { name },
  });

  revalidatePath('/dashboard/classes');
}

export async function deleteClass(formData: FormData) {
  const id = Number(formData.get('id'));

  await prisma.class.delete({
    where: { id },
  });

  revalidatePath('/dashboard/class');
}

export async function updateClass(id: number, formData: FormData) {
  const name = formData.get('name') as string;

  await prisma.class.update({ where: { id: id }, data: { name } });
  revalidatePath('/dashboard/classes');
}
