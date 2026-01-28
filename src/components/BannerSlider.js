'use client'
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner Slides
  const slides = [
    {
      id: 1,
      title: "Advancing Nuclear Science in Bangladesh",
      subtitle: "Leading innovation in atomic energy research and development",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=600&fit=crop",
      buttonText: "Learn More",
    },
    {
      id: 2,
      title: "Excellence in Scientific Research",
      subtitle: "Committed to sustainable energy solutions for the future",
      image:
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1920&h=600&fit=crop",
      buttonText: "Our Research",
    },
    {
      id: 3,
      title: "Join Our Scientific Community",
      subtitle: "Collaborate with leading atomic energy scientists",
      image:
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1920&h=600&fit=crop",
      buttonText: "Become a Member",
    },
  ];

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[500] md:h-[800] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100">
                {slide.subtitle}
              </p>
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
