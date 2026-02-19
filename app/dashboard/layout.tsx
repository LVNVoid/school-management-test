import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <header className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
          </header>
          <div className="">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
