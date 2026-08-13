import './globals.css'; // أو المسار الصحيح لملف globals.css لديك
export const metadata = {
  title: 'Nexus Engine',
  description: 'Nexus Engine Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  )
}