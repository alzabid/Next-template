"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getGalleryItems } from "@/lib/api";
import Link from "next/link";
import {
  Image as ImageIcon,
  Plus,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  Loader2,
  MapPin,
} from "lucide-react";

export default function DashboardHome() {
  const { user } = useAuth();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, recent: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getGalleryItems();
      const items = res.data || [];
      setGalleryItems(items);

      // Calculate recent (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentCount = items.filter((item) => {
        const d = new Date(item.createdAt || item.date);
        return d >= thirtyDaysAgo;
      }).length;

      setStats({ total: items.length, recent: recentCount });
    } catch {
      // If API fails, use empty
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Gallery Items",
      value: stats.total,
      icon: ImageIcon,
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/20",
      bg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Recent Uploads",
      value: stats.recent,
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/20",
      bg: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Account Role",
      value: user?.role || "ADMIN",
      icon: Users,
      color: "from-violet-500 to-violet-600",
      shadow: "shadow-violet-500/20",
      bg: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.name || "Admin"}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Manage your gallery items and keep your Nuclear Science Gallery up to date.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/gallery/new"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Gallery Item
            </Link>
            <Link
              href="/dashboard/gallery"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              View All Items
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">{card.value}</p>
              <p className="text-sm text-slate-500">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Gallery Items */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Recent Gallery Items</h2>
          <Link
            href="/dashboard/gallery"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
            <p className="text-slate-500">Loading gallery items...</p>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="p-12 text-center">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-4">No gallery items yet</p>
            <Link
              href="/dashboard/gallery/new"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Your First Item
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {galleryItems.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/dashboard/gallery/${item.id}/edit`}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex-shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
