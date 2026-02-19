'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClass } from '@/actions/class';

export default function AddClassDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await createClass(formData);
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tambah Kelas</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Data Kelas</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kelas</Label>
            <Input
              id="name"
              name="name"
              placeholder="Masukkan nama kelas"
              required
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
