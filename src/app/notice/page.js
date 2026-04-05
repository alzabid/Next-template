"use client";
import { useState, useEffect } from "react";
import { getNotices } from "@/lib/api";
import {
  Megaphone,
  Calendar,
  X,
  ChevronRight,
  Loader2,
  Bell,
  FileText,
  Volume2,
} from "lucide-react";

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await getNotices();
      setNotices(res.data || []);
    } catch {
      // API may fail silently
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Marquee Ticker */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden shadow-lg">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative flex items-center">
            {/* Label */}
            <div className="flex-shrink-0 bg-gradient-to-r from-yellow-500 to-amber-500 px-5 py-3 flex items-center gap-2 z-10 shadow-lg">
              <Volume2 className="w-4 h-4 text-white animate-pulse" />
              <span className="text-white text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                Latest
              </span>
            </div>

            {/* Scrolling content */}
            <div
              className="overflow-hidden flex-1 py-3"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="whitespace-nowrap"
                style={{
                  animation: `marquee ${Math.max(notices.length * 8, 20)}s linear infinite`,
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                {notices.map((notice, index) => (
                  <span key={notice.id || index} className="inline-flex items-center mx-8">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0" />
                    <button
                      onClick={() => setSelectedNotice(notice)}
                      className="text-white/90 hover:text-yellow-300 text-sm font-medium transition-colors cursor-pointer"
                    >
                      {notice.title}
                    </button>
                    {notice.createdAt && (
                      <span className="text-blue-100 text-xs ml-3">
                        ({formatDate(notice.createdAt)})
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      {/* Page Header */}
      <div className="text-blue-800 py-16">
        <div className="text-center max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Megaphone className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notice Board</h1>
          <p className="text-blue-900 text-lg max-w-2xl mx-auto">
            Stay updated with the latest announcements, notifications, and
            important information from BAESA
          </p>
        </div>
      </div>

      


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stats Bar */}
        {!loading && notices.length > 0 && (
          <div className="mb-8 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-100">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>
                <strong className="text-blue-800">{notices.length}</strong>{" "}
                {notices.length === 1 ? "Notice" : "Notices"} Published
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Loading notices...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && notices.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Notices Yet
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are no notices to display at this time. Please check back
              later for important updates and announcements.
            </p>
          </div>
        )}

        {/* Notices Grid */}
        {!loading && notices.length > 0 && (
          <div className="grid grid-cols-1  gap-6">
            {notices.map((notice, index) => (
              <div
                key={notice.id || index}
                onClick={() => setSelectedNotice(notice)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600 group cursor-pointer"
                style={{
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 px-6 py-4 border-b border-blue-100">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors shadow-sm">
                        <Megaphone className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                          {notice.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {notice.createdAt && (
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(notice.createdAt)}</span>
                    </div>
                  )}
<div className="flex flex-col md:flex-row  md:gap-10 justify-between md:items-center">
 <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {truncateText(notice.body, 150)}
                  </p>

                  <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all flex-shrink-0">
                    <span>Read Full Notice</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
</div>
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeIn 0.3s ease-out" }}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6 text-white relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                      <Megaphone className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">
                        Official Notice
                      </p>
                      <h2 className="text-xl md:text-2xl font-bold leading-tight">
                        {selectedNotice.title}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 backdrop-blur-sm"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
              {/* Date Badge */}
              {selectedNotice.createdAt && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-lg border border-blue-100">
                    <Calendar className="w-4 h-4" />
                    <span>Published on {formatDate(selectedNotice.createdAt)}</span>
                  </div>
                </div>
              )}

              {/* Notice Content */}
              <div className="prose prose-slate max-w-none">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                  <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                    {selectedNotice.body}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Bangladesh Atomic Energy Scientist&apos;s Association (BAESA)
                </p>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Section */}
      <div className="text-blue-800 py-12 mt-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-blue-800 mb-6 text-lg">
            All important announcements and notifications from BAESA are
            published here. Check this page regularly for updates.
          </p>
        </div>
      </div>
    </div>
  );
}
