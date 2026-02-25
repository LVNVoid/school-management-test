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
import { Pen } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';
import { createParent, updateParent } from '@/actions/parent';

type ParentFormDialogProps = {
  mode: 'create' | 'edit';
  initialData?: {
    id: number;
    name: string;
    studentId: number | null;
  };
  students: { id: number; name: string }[];
};

export default function ParentFormDialog({
  mode,
  initialData,
  students,
}: ParentFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      let result;
      if (mode === 'create') {
        result = await createParent(formData);
      } else if (mode === 'edit' && initialData) {
        result = await updateParent(initialData.id, formData);
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
          {mode === 'create' ? 'Tambah Orang Tua' : <Pen className="w-4 h-4" />}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create'
              ? 'Tambah Data Orang Tua'
              : 'Edit Data Orang Tua'}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Orang Tua</Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              placeholder="Masukkan nama orang tua"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">Siswa</Label>
            <Select
              name="studentId"
              defaultValue={initialData?.studentId?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Siswa" />
              </SelectTrigger>
              <SelectContent>
                {students.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
