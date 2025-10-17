import { redirect } from 'next/navigation';

interface AdminPageProps {
  params: {
    locale: string;
  };
}

export default function AdminPage({ params }: AdminPageProps) {
  redirect(`/${params.locale}/admin/dashboard`);
}
