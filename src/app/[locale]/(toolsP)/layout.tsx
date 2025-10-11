export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout intentionally doesn't render anything except children
  // to prevent the root layout's navbar/footer from showing
  // The root layout will still wrap this, but we render only the page content
  return <>{children}</>
}
