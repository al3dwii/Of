import { Navbar } from '@/components/navigation/navbar';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  );
}
