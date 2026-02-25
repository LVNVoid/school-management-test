import { getTeachers, deleteTeacher } from '@/actions/teacher';
import { getClasses } from '@/actions/class';
import TeacherFormDialog from '@/components/modal/teacher-form-dialog';
import ConfirmDialog from '@/components/modal/confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

export default async function TeacherPage() {
  const [teachers, classes] = await Promise.all([
    getTeachers(),
    getClasses(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Guru</h2>
          <p className="text-muted-foreground">Kelola data guru</p>
        </div>
        <TeacherFormDialog mode="create" classes={classes} />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Guru</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher, index) => (
              <TableRow key={teacher.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell className="font-medium">
                  {teacher.class.name}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <TeacherFormDialog
                    mode="edit"
                    initialData={teacher}
                    classes={classes}
                  />

                  <ConfirmDialog
                    title="Yakin ingin menghapus guru?"
                    description="Data guru yang sudah dihapus tidak dapat dikembalikan."
                    action={deleteTeacher}
                    id={teacher.id}
                    trigger={
                      <Button variant="destructive" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
            {teachers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Belum ada data guru.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
