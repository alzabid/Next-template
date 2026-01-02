"use client";
import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery data
  const galleryItems = [
    {
      id: 1,
      title: "International Nuclear Science Conference 2024",
      date: "December 15, 2024",
      location: "Dhaka, Bangladesh",
      attendees: "200+ Scientists",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Radiation Safety Workshop",
      date: "November 20, 2024",
      location: "BAEC, Dhaka",
      attendees: "50+ Participants",
      image:
        "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Nuclear Research Laboratory",
      date: "October 10, 2024",
      location: "Research Center",
      attendees: "Research Team",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Annual General Meeting 2024",
      date: "September 5, 2024",
      location: "Convention Center",
      attendees: "150+ Members",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Excellence in Research Award Ceremony",
      date: "August 15, 2024",
      location: "BAEC Auditorium",
      attendees: "100+ Guests",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Youth Science Conference",
      date: "July 22, 2024",
      location: "University Campus",
      attendees: "300+ Students",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    },
    {
      id: 7,
      title: "Advanced Nuclear Medicine Workshop",
      date: "June 18, 2024",
      location: "Medical Center",
      attendees: "40+ Doctors",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    },
    {
      id: 8,
      title: "Reactor Physics Experiment",
      date: "May 30, 2024",
      location: "Nuclear Facility",
      attendees: "Research Scientists",
      image:
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=600&fit=crop",
    },
    {
      id: 9,
      title: "Science Exhibition 2024",
      date: "April 12, 2024",
      location: "National Museum",
      attendees: "500+ Visitors",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    },
    {
      id: 10,
      title: "Best Paper Award Presentation",
      date: "March 25, 2024",
      location: "Conference Hall",
      attendees: "80+ Researchers",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    },
    {
      id: 11,
      title: "Regional Nuclear Safety Summit",
      date: "February 8, 2024",
      location: "Regional Center",
      attendees: "150+ Experts",
      image:
        "https://images.unsplash.com/photo-1559223607-d20c83b0c0b2?w=800&h=600&fit=crop",
    },
    {
      id: 12,
      title: "Laboratory Training Session",
      date: "January 15, 2024",
      location: "Training Lab",
      attendees: "30+ Trainees",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    },
  ];

  // Handle image click
  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Navigate through images in lightbox
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryItems.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(galleryItems[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="relative h-76 bg-gradient-to-r from-blue-900 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=800&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl md:text-xl text-blue-100">
              Explore moments from our conferences, workshops, and scientific activities
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section - Masonry Style */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Masonry Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item, index)}
              className="relative break-inside-avoid cursor-pointer group overflow-hidden rounded-lg"
              style={{ marginBottom: "1rem" }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay with Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-base mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Users className="w-3 h-3" />
                    <span>{item.attendees}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <p className="text-white font-semibold">
              {currentImageIndex + 1} / {galleryItems.length}
            </p>
          </div>

          {/* Image and Info Container */}
          <div
            className="max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain bg-gray-900"
                />
              </div>

              {/* Details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedImage.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-semibold">{selectedImage.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-semibold">{selectedImage.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Attendees</p>
                      <p className="font-semibold">{selectedImage.attendees}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
