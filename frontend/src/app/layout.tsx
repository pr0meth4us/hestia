// app/layout.tsx
import { AuthProvider } from '@/app/context/AuthContext';

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <body>
      <AuthProvider>
        {children}
      </AuthProvider>
      </body>
      </html>
  );
}