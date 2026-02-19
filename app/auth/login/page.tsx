'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from '@/actions/auth';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const initialState = {
  error: '',
};

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Masuk ke Akun</CardTitle>
        <CardDescription>
          Silakan masukkan username dan password untuk melanjutkan.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Masukkan username"
                required
                disabled={isPending}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                disabled={isPending}
              />
            </Field>

            <Field>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? 'Memproses...' : 'Masuk'}
              </Button>

              <FieldDescription className="text-center">
                Belum memiliki akun?{' '}
                <Link href="/auth/register">Daftar Sekarang</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>

          {state?.error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg text-center">
              {state.error}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
