import { getParents, deleteParent } from '@/actions/parent';
import { getStudentsWithoutParent } from '@/actions/student';
import ConfirmDialog from '@/components/modal/confirm-dialog';
import ParentFormDialog from '@/components/modal/parent-form-dialog';
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

const ParentsPage = async () => {

  const [parents, freeStudents] = await Promise.all([
    getParents(),
    getStudentsWithoutParent(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orang tua</h2>
          <p className="text-muted-foreground">Kelola data orang tua</p>
        </div>
        <ParentFormDialog mode="create" students={freeStudents} />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama orang tua</TableHead>
              <TableHead>Siswa</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parents.map((parent, index) => (
              <TableRow key={parent.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{parent.name}</TableCell>
                <TableCell>{parent.student?.name ?? '-'}</TableCell>
                <TableCell className="text-right space-x-2">
                  <ParentFormDialog
                    mode="edit"
                    students={
                      parent.student && !freeStudents.some((s) => s.id === parent.student!.id)
                        ? [...freeStudents, { id: parent.student.id, name: parent.student.name }]
                        : freeStudents
                    }
                    initialData={{
                      id: parent.id,
                      name: parent.name,
                      studentId: parent.student?.id ?? null,
                    }}
                  />
                  <ConfirmDialog
                    title="Yakin ingin menghapus orang tua?"
                    description="Data orang tua yang sudah dihapus tidak dapat dikembalikan."
                    action={deleteParent}
                    id={parent.id}
                    trigger={
                      <Button variant="destructive" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
            {parents.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Belum ada data orang tua.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ParentsPage;
