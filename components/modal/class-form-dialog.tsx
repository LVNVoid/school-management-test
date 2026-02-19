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
import { createClass, updateClass } from '@/actions/class';
import { Pen } from 'lucide-react';

type ClassFormDialogProps = {
  mode: 'create' | 'edit';
  initialData?: {
    id: number;
    name: string;
  };
};

export default function ClassFormDialog({
  mode,
  initialData,
}: ClassFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      if (mode === 'create') {
        await createClass(formData);
      } else if (mode === 'edit' && initialData) {
        await updateClass(initialData.id, formData);
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {mode === 'create' ? 'Tambah Kelas' : <Pen />}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Tambah Data Kelas' : 'Edit Data Kelas'}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kelas</Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              placeholder="Masukkan nama kelas"
              required
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending
              ? 'Menyimpan...'
              : mode === 'create'
                ? 'Simpan'
                : 'Update'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
