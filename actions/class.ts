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
export async function deleteClass(id: number) {
  try {
    await prisma.class.delete({ where: { id: id } });
    revalidatePath('/dashboard/classes');
    return { success: 'Kelas berhasil dihapus' };
  } catch (error) {
    return { error: 'Gagal menghapus kelas.' };
  }
}
