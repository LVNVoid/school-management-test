import { getStudents, deleteStudent } from '@/actions/student';
import { getClasses } from '@/actions/class';
import StudentFormDialog from '@/components/modal/student-form-dialog';
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

export default async function StudentPage() {
    const students = await getStudents();
    const classes = await getClasses();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Siswa</h2>
                    <p className="text-muted-foreground">Kelola data siswa</p>
                </div>
                <StudentFormDialog mode="create" classes={classes} />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Nama Siswa</TableHead>
                            <TableHead>Kelas</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={student.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell className="font-medium">
                                    {student.class.name}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <StudentFormDialog
                                        mode="edit"
                                        initialData={student}
                                        classes={classes}
                                    />

                                    <ConfirmDialog
                                        title="Yakin ingin menghapus siswa?"
                                        description="Data siswa yang sudah dihapus tidak dapat dikembalikan."
                                        action={deleteStudent}
                                        id={student.id}
                                        trigger={
                                            <Button variant="destructive" size="icon">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {students.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">
                                    Belum ada data siswa.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
