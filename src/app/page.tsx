// app/page.tsx - Root redirect to default locale
import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/data/locales';

export default function RootPage() {
  // Redirect to default locale
  redirect(`/${DEFAULT_LOCALE}`);
}
