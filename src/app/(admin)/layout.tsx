import { AdminSidebar } from "@/components/Admin/Sidebar";
import { AdminHeader } from "@/components/Admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      <AdminSidebar />

      <div className="ml-64 transition-all duration-300">
        <AdminHeader />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
