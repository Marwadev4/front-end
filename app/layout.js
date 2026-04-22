import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Typography Vault | Font & Theme Management",
  description: "Professional font management system for theme collections",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-processed-1821633465="true"
      className={" ndxd idc0_350"}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
