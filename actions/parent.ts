'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const getParents = async () => {
  return await prisma.parent.findMany({
    orderBy: { name: 'asc' },
    include: { student: true },
  });
};

export const createParent = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const studentId = Number(formData.get('studentId'));

  try {
    await prisma.parent.create({
      data: { name, student: { connect: { id: studentId } } },
    });

    revalidatePath('/dashboard/parents');
    return { success: true, message: 'Orang tua berhasil ditambahkan' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Gagal menambahkan orang tua' };
  }
};

export async function updateParent(id: number, formData: FormData) {
  const name = formData.get('name') as string;
  const studentId = Number(formData.get('studentId'));

  try {
    await prisma.parent.update({
      where: { id },
      data: { name, student: { connect: { id: studentId } } },
    });

    revalidatePath('/dashboard/parents');
    return { success: true, message: 'Data orang tua berhasil diperbarui' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Gagal memperbarui orang tua' };
  }
}

export async function deleteParent(formData: FormData) {
  const id = Number(formData.get('id'));

  try {
    await prisma.parent.delete({
      where: { id },
    });

    revalidatePath('/dashboard/parents');
    return { success: true, message: 'Data orang tua berhasil dihapus' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Gagal menghapus data orang tua' };
  }
}
