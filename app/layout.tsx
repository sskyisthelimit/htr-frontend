import { Sidebar } from "@/components/Sidebar";
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
