
import prisma from '@/lib/prisma';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function DashboardPage() {
  const classes = await prisma.class.findMany({
    include: {
      students: true,
      teachers: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Informasi sekolah</p>
        </div>
      </div>

      {/* List Siswa berdasarkan kelasnya */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa per Kelas</CardTitle>
          <CardDescription>
            Informasi detail mengenai siswa yang terdaftar di setiap kelas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] font-bold text-foreground">
                    Nama Kelas
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Daftar Siswa
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id} className="hover:bg-muted/5">
                    <TableCell className="font-medium align-top py-4">
                      {cls.name}
                    </TableCell>
                    <TableCell className="align-top py-4">
                      {cls.students.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {cls.students.map((student) => (
                            <Badge
                              variant="secondary"
                              key={student.id}
                            >
                              {student.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic text-sm">
                          Belum ada siswa
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {classes.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Tidak ada data siswa.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* List Guru berdasarkan Kelasnya */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Guru per Kelas</CardTitle>
          <CardDescription>
            Informasi detail mengenai guru yang mengajar di setiap kelas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] font-bold text-foreground">
                    Nama Kelas
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Daftar Guru
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id} className="hover:bg-muted/5">
                    <TableCell className="font-medium align-top py-4">
                      {cls.name}
                    </TableCell>
                    <TableCell className="align-top py-4">
                      {cls.teachers.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {cls.teachers.map((teacher) => (
                            <li key={teacher.id} className="text-sm">
                              {teacher.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted-foreground italic text-sm">
                          Belum ada guru
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {classes.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Tidak ada data guru.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* List Siswa, Kelas dan Guru */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Gabungan</CardTitle>
          <CardDescription>
            Seluruh data siswa dan guru berdasarkan kelas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] font-bold text-foreground">
                    Nama Kelas
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Siswa
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Guru
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id} className="hover:bg-muted/5">
                    <TableCell className="font-medium align-top py-4">
                      {cls.name}
                    </TableCell>
                    <TableCell className="align-top py-4">
                      {cls.students.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {cls.students.map((student) => (
                            <span key={student.id} className="text-sm">
                              • {student.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic text-sm">
                          Belum ada siswa
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="align-top py-4">
                      {cls.teachers.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {cls.teachers.map((teacher) => (
                            <span key={teacher.id} className="text-sm">
                              • {teacher.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic text-sm">
                          Belum ada guru
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {classes.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Tidak ada data siswa dan guru.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
