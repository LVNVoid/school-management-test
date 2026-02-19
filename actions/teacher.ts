'use server';

import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache';

export async function getTeachers() {
  return await prisma.teacher.findMany({
    orderBy: { name: 'asc' },
    include: { class: true },
  });
}

export async function createTeacher(formData: FormData) {
  const name = formData.get('name') as string;
  const classId = Number(formData.get('classId'));

  try {
    const existingTeacher = await prisma.teacher.findFirst({
        where: { name, classId }
    });

    if (existingTeacher) {
        return { success: false, message: 'Guru sudah ada di kelas ini' };
    }

    await prisma.teacher.create({
      data: { name, classId },
    });

    revalidatePath('/dashboard/teachers');
    return { success: true, message: 'Guru berhasil ditambahkan' };
  } catch (error) {
    return { success: false, message: 'Gagal menambahkan guru' };
  }
}

export async function updateTeacher(id: number, formData: FormData) {
  const name = formData.get('name') as string;
  const classId = Number(formData.get('classId'));

  try {
    await prisma.teacher.update({
      where: { id },
      data: { name, classId },
    });

    revalidatePath('/dashboard/teachers');
    return { success: true, message: 'Data guru berhasil diperbarui' };
  } catch (error) {
    return { success: false, message: 'Gagal memperbarui data guru' };
  }
}

export async function deleteTeacher(formData: FormData) {
  const id = Number(formData.get('id'));

  try {
    await prisma.teacher.delete({
      where: { id },
    });

    revalidatePath('/dashboard/teachers');
    return { success: true, message: 'Data guru berhasil dihapus' };
  } catch (error) {
    return { success: false, message: 'Gagal menghapus data guru' };
  }
}
