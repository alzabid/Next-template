"use client";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Calendar, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="p-16 text-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  const profileFields = [
    { label: "Full Name", value: user?.name || "N/A", icon: User },
    { label: "Email Address", value: user?.email || "N/A", icon: Mail },
    { label: "Role", value: user?.role || "N/A", icon: Shield },
    {
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
      icon: Calendar,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name || "Admin User"}</h1>
            <p className="text-blue-100 mt-1">{user?.email || ""}</p>
            <span className="inline-block mt-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
              {user?.role || "ADMIN"}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Account Information
          </h2>
        </div>
        {profileFields.map((field, i) => {
          const Icon = field.icon;
          return (
            <div key={i} className="flex items-center gap-4 px-6 py-5">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">{field.label}</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{field.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
