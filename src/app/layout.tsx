import type { Metadata } from "next";
import '../styles/globals.css'

export const metadata: Metadata = {
  title: "Docker Assignment",
  description: "CPSY300",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
