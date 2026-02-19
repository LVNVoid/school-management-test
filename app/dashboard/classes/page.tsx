import { deleteClass, getClasses } from '@/actions/class';
import ClassFormDialog from '@/components/modal/class-form-dialog';
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

export default async function classPage() {
  const dataclass = await getClasses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelas</h2>
          <p className="text-muted-foreground">Kelola data kelas</p>
        </div>
        <ClassFormDialog mode="create" />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama kelas</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataclass.map((classItem, index) => (
              <TableRow key={classItem.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{classItem.name}</TableCell>
                <TableCell className="text-right space-x-2">
                  <ClassFormDialog mode="edit" initialData={classItem} />

                  <ConfirmDialog
                    title="Yakin ingin menghapus kelas?"
                    description="Data kelas yang sudah dihapus tidak dapat dikembalikan."
                    action={deleteClass}
                    id={classItem.id}
                    trigger={
                      <Button variant="destructive" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
            {dataclass.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Belum ada data kelas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
