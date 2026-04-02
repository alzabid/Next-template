"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  LayoutDashboard,
  Image as ImageIcon,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Loader2,
  Home,
  Sparkles,
  Clock,
  Shield,
  Bell,
} from "lucide-react";

const sidebarLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview & analytics",
    color: "blue",
  },
  {
    href: "/dashboard/gallery",
    label: "Gallery",
    icon: ImageIcon,
    description: "Manage photos",
    color: "violet",
  },
  {
    href: "/dashboard/profile",
    label: "My Profile",
    icon: User,
    description: "Account info",
    color: "emerald",
  },
];

const activeColors = {
  blue: "from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400",
  violet: "from-violet-500/20 to-violet-600/5 border-violet-500/30 text-violet-400",
  emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400",
};

const activeIconBg = {
  blue: "bg-blue-500/20 text-blue-400 shadow-blue-500/10",
  violet: "bg-violet-500/20 text-violet-400 shadow-violet-500/10",
  emerald: "bg-emerald-500/20 text-emerald-400 shadow-emerald-500/10",
};

const activeBar = {
  blue: "from-blue-400 to-blue-600",
  violet: "from-violet-400 to-violet-600",
  emerald: "from-emerald-400 to-emerald-600",
};

export default function DashboardLayout({ children }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-500/20 animate-pulse">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const initials = (user?.name || "A")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════════ Sidebar ═══════════════ */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:z-auto flex flex-col overflow-hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0c1222]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-600/5 to-transparent" />

        {/* Content wrapper — relative for z-index above background */}
        <div className="relative z-10 flex flex-col h-full">
          {/* ── Brand Header ── */}
          <div className="h-[68px] flex items-center justify-between px-5 border-b border-white/[0.06] flex-shrink-0">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="leading-none">
                <span className="text-[15px] font-bold text-white tracking-tight block">
                  BAESA
                </span>
                <span className="text-[10px] text-blue-400/60 font-semibold uppercase tracking-[0.15em]">
                  Admin Panel
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── Profile Card ── */}
          <div className="px-4 pt-5 pb-2 flex-shrink-0">
            <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl p-4 border border-white/[0.06] overflow-hidden">
              {/* Glow accent */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

              <div className="relative flex items-center gap-3.5">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xl shadow-blue-600/20 ring-2 ring-white/10">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white truncate leading-tight">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {user?.email || "admin@gallery.com"}
                  </p>
                </div>
              </div>

              <div className="relative mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Online
                </span>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-amber-400/70" />
                  <span className="text-[10px] text-amber-400/70 font-medium">
                    {user?.role || "ADMIN"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Date/Time ── */}
          <div className="px-6 py-3 flex items-center justify-between flex-shrink-0">
            <span className="text-[11px] text-slate-500 font-medium">{currentDate}</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <Clock className="w-3 h-3" />
              {currentTime}
            </span>
          </div>

          {/* ── Section Label ── */}
          <div className="px-6 pt-2 pb-3 flex-shrink-0">
            <p className="text-[10px] font-bold text-slate-500/80 uppercase tracking-[0.2em]">
              Navigation
            </p>
          </div>

          {/* ── Navigation ── */}
          <nav className="px-3 space-y-1.5 flex-1 overflow-y-auto">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 group ${
                    isActive
                      ? `bg-gradient-to-r ${activeColors[item.color]} border`
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-gradient-to-b ${activeBar[item.color]} rounded-r-full shadow-sm`}
                    />
                  )}

                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isActive
                        ? `${activeIconBg[item.color]} shadow-sm`
                        : "bg-white/[0.04] text-slate-500 group-hover:bg-white/[0.07] group-hover:text-slate-300"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="block leading-tight">{item.label}</span>
                    <span
                      className={`text-[10px] leading-tight mt-0.5 block ${
                        isActive
                          ? "opacity-50"
                          : "text-slate-600 group-hover:text-slate-500"
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>

                  {isActive && (
                    <ChevronRight className="w-4 h-4 opacity-40 flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Quick Actions Divider ── */}
          <div className="px-6 pt-4 pb-2 flex-shrink-0">
            <p className="text-[10px] font-bold text-slate-500/80 uppercase tracking-[0.2em]">
              Quick Actions
            </p>
          </div>

          {/* ── Footer Links ── */}
          <div className="px-3 pb-2 flex-shrink-0 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[13px] text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all group border border-transparent"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors">
                <Home className="w-[18px] h-[18px] text-slate-500 group-hover:text-slate-300" />
              </div>
              <span>Back to Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[13px] text-red-400/70 hover:text-red-300 hover:bg-red-500/[0.06] transition-all w-full group border border-transparent hover:border-red-500/10"
            >
              <div className="w-9 h-9 rounded-lg bg-red-500/[0.08] flex items-center justify-center group-hover:bg-red-500/[0.12] transition-colors">
                <LogOut className="w-[18px] h-[18px] text-red-400/70 group-hover:text-red-300" />
              </div>
              <span>Sign Out</span>
            </button>
          </div>

          {/* ── Branding Footer ── */}
          <div className="px-5 py-3.5 border-t border-white/[0.04] flex-shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-slate-600">
                © {new Date().getFullYear()} BAESA
              </p>
              <span className="text-[9px] text-slate-700 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.04]">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══════════════ Main Content ═══════════════ */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header */}
        <header className="h-[68px] bg-white/90 backdrop-blur-xl border-b border-slate-200/80 flex items-center justify-between px-6 sticky top-0 z-30 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ring-4 ring-blue-500/10" />
              <h2 className="text-sm font-semibold text-slate-800">
                {sidebarLinks.find(
                  (l) =>
                    pathname === l.href ||
                    (l.href !== "/dashboard" && pathname.startsWith(l.href))
                )?.label || "Dashboard"}
              </h2>
            </div>
          </div>

          {/* Header Right */}
          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-tight">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {user?.role || "Administrator"}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/15 ring-2 ring-blue-500/10">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
