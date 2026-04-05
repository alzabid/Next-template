'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getEventBySlug } from "@/lib/api";
import {
  Calendar,
  MapPin,
  ChevronRight,
  Loader2,
  ArrowLeft,
  Clock,
  Phone,
  User,
  Gift,
  Share2,
  Home,
  Printer,
  ExternalLink,
} from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) fetchEvent();
  }, [slug]);

  const fetchEvent = async () => {
    try {
      const res = await getEventBySlug(slug);
      setEvent(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading event...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-slate-300" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">
            Event Not Found
          </h1>
          <p className="text-slate-500 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const renderBodyText = (text) => {
    if (!text) return null;
    return text.split(/\\n|\n/).map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split(/\\n|\n/).length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[280px] sm:h-[380px] md:h-[480px] lg:h-[540px] overflow-hidden">
        <img
          src={
            event.bannerImage ||
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop"
          }
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 md:top-6 md:left-8 z-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All Events
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {event.eventDate && (
                <span className="inline-flex items-center gap-1.5 text-sm text-white/90 font-medium bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.eventDate}
                </span>
              )}
              {event.venue && (
                <span className="inline-flex items-center gap-1.5 text-sm text-white/90 font-medium bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.venue}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 py-3.5 text-sm text-slate-400 overflow-x-auto">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors flex items-center gap-1 flex-shrink-0"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link
              href="/news"
              className="hover:text-blue-600 transition-colors flex-shrink-0"
            >
              News & Events
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-600 font-medium truncate">
              {event.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Article Content */}
          <article className="lg:col-span-8">
            {/* Meta Bar */}
            <div className="flex flex-wrap items-center gap-4 pb-6 mb-8 border-b border-slate-100">
              {event.organizationName && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Published by</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {event.organizationName}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 px-3 py-2 rounded-lg"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 px-3 py-2 rounded-lg"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>

            {/* Greeting */}
            {event.greeting && (
              <div className="mb-8">
                <p className="text-lg md:text-xl text-slate-800 font-semibold leading-relaxed whitespace-pre-line">
                  {renderBodyText(event.greeting)}
                </p>
              </div>
            )}

            {/* Body Text */}
            {event.bodyText && (
              <div className="mb-10">
                <div className="prose prose-slate prose-lg max-w-none">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                    {renderBodyText(event.bodyText)}
                  </p>
                </div>
              </div>
            )}

            {/* Schedule Table */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-7 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                  অনুষ্ঠানসূচি
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full max-w-2xl">
                    <thead>
                      <tr className="border-b-2 border-blue-600">
                        <th className="text-left py-4 px-5 text-sm font-bold text-blue-900 uppercase tracking-wider bg-blue-50/50 rounded-tl-xl">
                          কার্যক্রম
                        </th>
                        <th className="text-left py-4 px-5 text-sm font-bold text-blue-900 uppercase tracking-wider bg-blue-50/50 rounded-tr-xl">
                          সময়
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.schedule.map((item, index) => (
                        <tr
                          key={index}
                          className={`border-b border-slate-100 hover:bg-blue-50/30 transition-colors ${
                            index % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                          }`}
                        >
                          <td className="py-4 px-5 text-slate-700 font-medium text-sm md:text-base">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                              {item.activity}
                            </div>
                          </td>
                          <td className="py-4 px-5 text-slate-600 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                              {item.time}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Closing Text */}
            {event.closingText && (
              <div className="mb-8 text-center">
                <p className="text-lg text-blue-900 font-medium">
                  {renderBodyText(event.closingText)}
                </p>
              </div>
            )}

            {/* Contact Persons */}
            {event.contactPersons && event.contactPersons.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-7 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                  Contact Persons
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.contactPersons.map((person, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-5 border border-slate-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-base">
                            {person.name}
                          </p>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {person.designation}
                          </p>
                          {person.mobile && (
                            <a
                              href={`tel:${person.mobile}`}
                              className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium mt-2 hover:text-blue-700"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              {person.mobile}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organization Footer */}
            {event.organizationName && (
              <div className="mt-10 pt-6 border-t-2 border-blue-600">
                <h2 className="text-center text-xl sm:text-2xl font-bold text-blue-800">
                  {event.organizationName}
                </h2>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-300" />
                    Event Details
                  </h3>
                  <div className="space-y-4">
                    {event.eventDate && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Calendar className="w-4 h-4 text-blue-300" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-200/60 uppercase tracking-wider font-semibold">
                            Date
                          </p>
                          <p className="text-sm font-medium text-white/90 mt-0.5">
                            {event.eventDate}
                          </p>
                        </div>
                      </div>
                    )}
                    {event.venue && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4 text-blue-300" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-200/60 uppercase tracking-wider font-semibold">
                            Venue
                          </p>
                          <p className="text-sm font-medium text-white/90 mt-0.5">
                            {event.venue}
                          </p>
                          {event.venueAddress && (
                            <p className="text-xs text-blue-200/50 mt-0.5">
                              {event.venueAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {event.contactPersons && event.contactPersons.length > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Phone className="w-4 h-4 text-blue-300" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-200/60 uppercase tracking-wider font-semibold">
                            Contact
                          </p>
                          {event.contactPersons.map((p, i) => (
                            <p
                              key={i}
                              className="text-sm text-white/90 mt-0.5"
                            >
                              {p.name}{" "}
                              {p.mobile && (
                                <span className="text-blue-300/80">
                                  — {p.mobile}
                                </span>
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Share this Event
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-50 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
              </div>

              {/* CTA Card */}
              {event.ctaTitle && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100/50">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {event.ctaTitle}
                  </h3>
                  {event.ctaSubtitle && (
                    <p className="text-sm text-slate-500 mb-4">
                      {event.ctaSubtitle}
                    </p>
                  )}
                  {event.ctaButtonText && (
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20">
                      {event.ctaButtonText}
                    </button>
                  )}
                </div>
              )}

              {/* Back to Events */}
              <Link
                href="/news"
                className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Events
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Featured Section (Lucky Draw, etc.) */}
      {event.featuredTitle && (
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-lg border border-orange-100/50">
              {/* Image Side */}
              {event.featuredImage && (
                <div className="relative h-72 lg:h-auto">
                  <img
                    src={event.featuredImage}
                    alt={event.featuredTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent" />
                </div>
              )}

              {/* Content Side */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                {event.featuredSubtitle && (
                  <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-4 w-fit">
                    {event.featuredSubtitle}
                  </span>
                )}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5">
                  {event.featuredTitle}
                </h2>
                {event.featuredDescription && (
                  <p className="text-slate-600 text-base leading-relaxed mb-6">
                    {event.featuredDescription}
                  </p>
                )}

                {/* Featured Items */}
                {event.featuredItems && event.featuredItems.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {event.featuredItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
                          <Gift className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">
                            {item.title}
                          </h4>
                          <p className="text-slate-500 text-sm mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlight */}
                {event.featuredHighlightTitle && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-2xl">
                    <p className="text-base font-bold mb-1.5">
                      {event.featuredHighlightTitle}
                    </p>
                    {event.featuredHighlightText && (
                      <p className="text-orange-100 text-sm">
                        {event.featuredHighlightText}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      {event.ctaTitle && (
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {event.ctaTitle}
            </h2>
            {event.ctaSubtitle && (
              <p className="text-blue-100/80 text-lg mb-8">
                {event.ctaSubtitle}
              </p>
            )}
            {event.ctaButtonText && (
              <button className="bg-white text-blue-900 px-10 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg text-lg">
                {event.ctaButtonText}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
