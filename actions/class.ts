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

  try {
    const existingClass = await prisma.class.findUnique({
      where: { name },
    });

    if (existingClass) {
      return { success: false, message: 'Kelas sudah ada' };
    }

    await prisma.class.create({
      data: { name },
    });

    revalidatePath('/dashboard/classes');
    return { success: true, message: 'Kelas berhasil dibuat' };
  } catch (error) {
    return { success: false, message: 'Gagal membuat kelas' };
  }
}

export async function deleteClass(formData: FormData) {
  const id = Number(formData.get('id'));

  try {
    await prisma.class.delete({
      where: { id },
    });

    revalidatePath('/dashboard/class');
    return { success: true, message: 'Kelas berhasil dihapus' };
  } catch (error) {
    return { success: false, message: 'Gagal menghapus kelas' };
  }
}

export async function updateClass(id: number, formData: FormData) {
  const name = formData.get('name') as string;

  try {
    await prisma.class.update({ where: { id: id }, data: { name } });
    revalidatePath('/dashboard/classes');
    return { success: true, message: 'Kelas berhasil diperbarui' };
  } catch (error) {
    return { success: false, message: 'Gagal memperbarui kelas' };
  }
}
