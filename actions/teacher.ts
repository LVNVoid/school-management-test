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

  await prisma.teacher.create({
    data: { name, classId },
  });

  revalidatePath('/dashboard/teachers');
}

export async function updateTeacher(id: number, formData: FormData) {
  const name = formData.get('name') as string;
  const classId = Number(formData.get('classId'));

  await prisma.teacher.update({
    where: { id },
    data: { name, classId },
  });

  revalidatePath('/dashboard/teachers');
}

export async function deleteTeacher(formData: FormData) {
  const id = Number(formData.get('id'));

  await prisma.teacher.delete({
    where: { id },
  });

  revalidatePath('/dashboard/teachers');
}
