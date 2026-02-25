'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/session';

type AuthState = {
  error?: string;
};

export async function login(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Semua field wajib diisi' };
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Username atau password salah!' };
  }

  await createSession(String(user.id));

  redirect('/dashboard');
}

export async function register(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = formData.get('name') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const existingUser = await prisma.user.findUnique({ where: { username } });

  if (existingUser) {
    return { error: 'Username sudah digunakan' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, username, password: hashedPassword },
  });

  redirect('/auth/login');
}

export async function logout() {
  await deleteSession();
  redirect('/auth/login');
}
