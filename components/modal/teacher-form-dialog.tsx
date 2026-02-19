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
import { createTeacher, updateTeacher } from '@/actions/teacher';
import { Pen } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

type TeacherFormDialogProps = {
  mode: 'create' | 'edit';
  initialData?: {
    id: number;
    name: string;
    classId: number;
  };
  classes: { id: number; name: string }[];
};

export default function TeacherFormDialog({
  mode,
  initialData,
  classes,
}: TeacherFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      let result;
      if (mode === 'create') {
        result = await createTeacher(formData);
      } else if (mode === 'edit' && initialData) {
        result = await updateTeacher(initialData.id, formData);
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
          {mode === 'create' ? 'Tambah Guru' : <Pen className="w-4 h-4" />}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Tambah Data Guru' : 'Edit Data Guru'}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Guru</Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              placeholder="Masukkan nama guru"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classId">Kelas</Label>
            <Select name="classId" defaultValue={initialData?.classId.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.name}
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
