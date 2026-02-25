import {
  Users,
  GraduationCap,
  School,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { logout } from '@/actions/auth';
import Link from 'next/link';

const items = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Kelas', url: '/dashboard/classes', icon: School },
  { title: 'Siswa', url: '/dashboard/students', icon: GraduationCap },
  { title: 'Guru', url: '/dashboard/teachers', icon: Users },
  { title: 'Orang Tua', url: '/dashboard/parents', icon: Users },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold px-4 py-6">
            School Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <form action={logout}>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full">
            <LogOut size={18} />
            <span className="font-medium">Keluar</span>
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
