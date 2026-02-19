import { getClasses } from '@/actions/class';
import AddClassDialog from '@/components/modal/create-class-dialog';
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
        <AddClassDialog />
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
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => deleteClass(classItem.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
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
