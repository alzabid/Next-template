'use client'

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  ChevronRight,
  Search,
  Bell,
} from "lucide-react";

export default function NewsEventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // News and Events data
  const newsEvents = [
    {
      id: 1,
      type: "event",
      title: "International Nuclear Science Conference 2025",
      description:
        "Join us for the biggest nuclear science conference of the year featuring renowned scientists from around the world discussing latest advances in nuclear technology.",
      date: "March 15-17, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "BAEC Convention Center, Dhaka",
      category: "Conference",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      status: "upcoming",
    },
    {
      id: 2,
      type: "news",
      title: "BAESA Scientists Publish Breakthrough Research",
      description:
        "Our research team has published groundbreaking findings on radiation therapy applications in leading international journal Nature Physics.",
      date: "January 20, 2025",
      category: "Research",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
      status: "recent",
    },
    {
      id: 3,
      type: "event",
      title: "Workshop on Radiation Safety Protocols",
      description:
        "Comprehensive hands-on training program covering latest radiation safety standards, emergency procedures, and best practices.",
      date: "February 20, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "BAESA Training Center",
      category: "Workshop",
      image:
        "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&h=600&fit=crop",
      status: "upcoming",
    },
    {
      id: 4,
      type: "news",
      title: "New Partnership with International Atomic Energy Agency",
      description:
        "BAESA announces strategic collaboration with IAEA to enhance nuclear research capabilities and knowledge exchange programs.",
      date: "January 15, 2025",
      category: "Partnership",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      status: "recent",
    },
    {
      id: 5,
      type: "event",
      title: "Annual General Meeting 2025",
      description:
        "All members are invited to attend our annual general meeting to discuss achievements, future plans, and elect new executive members.",
      date: "January 28, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "BAEC Auditorium",
      category: "Meeting",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      status: "upcoming",
    },
    {
      id: 6,
      type: "news",
      title: "Young Scientist Award Winners Announced",
      description:
        "BAESA recognizes outstanding contributions by early-career researchers in nuclear science with prestigious awards and grants.",
      date: "December 10, 2024",
      category: "Awards",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
      status: "archive",
    },
    {
      id: 7,
      type: "event",
      title: "Nuclear Medicine Symposium",
      description:
        "Expert discussions on latest developments in nuclear medicine, diagnostic imaging, and therapeutic applications.",
      date: "April 5, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Medical College Auditorium",
      category: "Symposium",
      image:
        "https://images.unsplash.com/photo-1581093458791-9d42e3c2e0b0?w=800&h=600&fit=crop",
      status: "upcoming",
    },
    {
      id: 8,
      type: "news",
      title: "BAESA Launches New Research Initiative",
      description:
        "Major research program announced focusing on sustainable nuclear energy solutions and environmental safety measures.",
      date: "December 1, 2024",
      category: "Initiative",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      status: "archive",
    },
  ];

  // Filter data based on active tab and search
  const filteredData = newsEvents.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Separate upcoming and past events
  const upcomingEvents = filteredData.filter(
    (item) => item.type === "event" && item.status === "upcoming",
  );
  const recentNews = filteredData.filter(
    (item) => item.type === "news" && item.status === "recent",
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Page Header */}
      <div className="text-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            News & Events
          </h1>
          <p className="text-blue-900 text-lg text-center">
            Stay updated with latest news, upcoming events, and scientific
            activities
          </p>
        </div>
      </div>

      {/* Featured/Urgent News Banner */}
      {/* <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                Registration Open: International Nuclear Science Conference 2025
              </h3>
              <p className="text-orange-100 mb-3">
                Early bird registration deadline: February 15, 2025. Limited
                seats available!
              </p>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Search and Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news and events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "news"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
          >
            News
          </button>
          <button
            onClick={() => setActiveTab("event")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "event"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
          >
            Events
          </button>
        </div>

        {/* Upcoming Events Section */}
        {(activeTab === "all" || activeTab === "event") &&
          upcomingEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {upcomingEvents.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600 group"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {item.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:w-3/5 p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {item.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                          Learn More
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Recent News Section */}
        {(activeTab === "all" || activeTab === "news") &&
          recentNews.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Recent News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentNews.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-600 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                        Read More
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* All Updates Grid */}
        {activeTab === "all" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              All Updates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-600 group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {item.type}
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                      {item.type === "event" ? "Learn More" : "Read More"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with BAESA
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Subscribe to our newsletter to receive latest news and event
            notifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
