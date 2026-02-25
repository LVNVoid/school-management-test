'use server';

import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache';

export async function getStudents() {
  return await prisma.student.findMany({
    orderBy: { name: 'asc' },
    include: { class: true },
  });
}

export async function getStudentsName() {
  return await prisma.student.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

export async function getStudentsWithoutParent() {
  return await prisma.student.findMany({
    where: { parent: null },
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: 'asc' },
  });
}

export async function createStudent(formData: FormData) {
  const name = formData.get('name') as string;
  const classId = Number(formData.get('classId'));

  try {
    const existingStudent = await prisma.student.findFirst({
      where: { name, classId },
    });

    if (existingStudent) {
      return { success: false, message: 'Siswa sudah ada di kelas ini' };
    }

    await prisma.student.create({
      data: { name, classId },
    });

    revalidatePath('/dashboard/students');
    return { success: true, message: 'Siswa berhasil ditambahkan' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Gagal menambahkan siswa' };
  }
}

export async function updateStudent(id: number, formData: FormData) {
  const name = formData.get('name') as string;
  const classId = Number(formData.get('classId'));

  try {
    await prisma.student.update({
      where: { id },
      data: { name, classId },
    });

    revalidatePath('/dashboard/students');
    return { success: true, message: 'Data siswa berhasil diperbarui' };
  } catch (error) {
    return { success: false, message: 'Gagal memperbarui data siswa' };
  }
}

export async function deleteStudent(formData: FormData) {
  const id = Number(formData.get('id'));

  try {
    await prisma.student.delete({
      where: { id },
    });

    revalidatePath('/dashboard/students');
    return { success: true, message: 'Data siswa berhasil dihapus' };
  } catch (error) {
    return { success: false, message: 'Gagal menghapus data siswa' };
  }
}
