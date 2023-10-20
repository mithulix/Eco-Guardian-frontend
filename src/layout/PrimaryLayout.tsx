"use client";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noNav = [
    "/signup",
    "/signin",
    "/super_admin",
    "/super_admin/manage_admin",
    "/super_admin/manage_admin/create",
    "/super_admin/manage_admin/edit",
    "/super_admin/manage_service",
    "/super_admin/manage_service/create",
    "/super_admin/manage_service/edit",
    "/super_admin/manage_content",
    "/admin",
    "/admin/manage_service",
    "/admin/manage_service/create",
    "/admin/manage_service/edit",
    "/admin/manage_content",
    "/user",
    "/user/my_services",
    "/user/booking_history",
    "/super_admin/manage_booking",
    "/admin/manage_booking",
    "/admin/booking_history",
    "/admin/manage_category",
  ];

  if (noNav.includes(pathname)) {
    return (
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </html>
    );
  }

  return (
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </body>
      </html>
  );
}