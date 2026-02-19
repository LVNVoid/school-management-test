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
import toast from 'react-hot-toast';

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
      let result;
      if (mode === 'create') {
        result = await createClass(formData);
      } else if (mode === 'edit' && initialData) {
        result = await updateClass(initialData.id, formData);
      }

      if (result) {
        if (result.success) {
          toast.success(result.message);
          setOpen(false);
        } else {
          toast.error(result.message);
        }
      }
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
