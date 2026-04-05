'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPublishedEvents } from "@/lib/api";
import {
  Calendar,
  MapPin,
  Search,
  ChevronRight,
  Loader2,
  ArrowRight,
  Clock,
  Eye,
} from "lucide-react";

export default function NewsEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getPublishedEvents();
      setEvents(res.data || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((item) => {
    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.bodyText || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.venue || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr;
  };

  const getExcerpt = (text, maxLen = 120) => {
    if (!text) return "";
    const cleaned = text.replace(/\\n/g, " ").replace(/\n/g, " ");
    return cleaned.length > maxLen
      ? cleaned.substring(0, maxLen) + "..."
      : cleaned;
  };

  // Featured event (first one)
  const featuredEvent = filteredEvents.length > 0 ? filteredEvents[0] : null;
  const otherEvents = filteredEvents.length > 1 ? filteredEvents.slice(1) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/10">
              <Calendar className="w-4 h-4" />
              Stay Updated
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              News & Events
            </h1>
            <p className="text-blue-100/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover upcoming events, conferences, and the latest activities
              from BAESA
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-auto fill-slate-50">
            <path d="M0,40 C360,80 720,0 1440,40 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      {/* Search & Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 shadow-sm shadow-slate-100 transition-all text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-lg">Loading events...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && events.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              Unable to load events
            </h3>
            <p className="text-slate-500">
              Please try again later or check your connection.
            </p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              {searchTerm ? "No events match your search" : "No events yet"}
            </h3>
            <p className="text-slate-500">
              {searchTerm
                ? "Try a different keyword"
                : "Check back soon for upcoming events!"}
            </p>
          </div>
        )}

        {/* Featured Event */}
        {!loading && featuredEvent && (
          <div className="mb-14">
            <Link
              href={`/news/events/${featuredEvent.slug}`}
              className="group block"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-500 border border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative h-64 sm:h-80 lg:h-[420px] overflow-hidden">
                    <img
                      src={
                        featuredEvent.bannerImage ||
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                      }
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/10" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      {featuredEvent.eventDate && (
                        <span className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(featuredEvent.eventDate)}
                        </span>
                      )}
                      {featuredEvent.venue && (
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-full">
                          <MapPin className="w-3.5 h-3.5" />
                          {featuredEvent.venue}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                      {featuredEvent.title}
                    </h2>

                    <p className="text-slate-500 text-base leading-relaxed mb-6 line-clamp-3">
                      {getExcerpt(featuredEvent.bodyText, 200)}
                    </p>

                    {featuredEvent.organizationName && (
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-6">
                        By {featuredEvent.organizationName}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Events Grid */}
        {!loading && otherEvents.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              <h2 className="text-2xl font-bold text-slate-800">
                All Events
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {otherEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/news/events/${event.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm shadow-slate-100 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-400 border border-slate-100 hover:border-slate-200 h-full flex flex-col">
                    {/* Card Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={
                          event.bannerImage ||
                          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                        }
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      {event.eventDate && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-blue-500" />
                            {formatDate(event.eventDate)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {event.venue && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-3">
                          <MapPin className="w-3 h-3" />
                          <span>{event.venue}{event.venueAddress ? `, ${event.venueAddress}` : ""}</span>
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-slate-800 mb-2.5 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 leading-snug">
                        {event.title}
                      </h3>

                      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {getExcerpt(event.bodyText, 120)}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold group-hover:gap-2.5 transition-all duration-300">
                          Read More
                          <ChevronRight className="w-4 h-4" />
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Eye className="w-3 h-3" />
                          View
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Show single event case — when there's only the featured one */}
        {!loading && filteredEvents.length === 1 && (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm">
              More events coming soon — stay tuned!
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      {/* <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with BAESA
          </h2>
          <p className="text-blue-100/80 text-lg mb-8">
            Subscribe to our newsletter to receive latest news and event
            notifications
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3.5 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-blue-200/50"
            />
            <button className="bg-white text-blue-900 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
