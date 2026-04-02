"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HIDE_LAYOUT_ROUTES = ["/dashboard", "/login", "/register"];

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = HIDE_LAYOUT_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
