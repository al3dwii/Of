export default function SeoHeading({
  as: As = "h1",
  children,
  className = "",
}: {
  as?: any;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <As className={`text-2xl md:text-4xl font-bold tracking-tight ${className}`}>
      {children}
    </As>
  );
}
