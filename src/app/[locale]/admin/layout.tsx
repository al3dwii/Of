import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: 'Admin Panel - Presentation Platform',
  description: 'Admin dashboard for managing users, analytics, and system settings',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
