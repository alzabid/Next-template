'use client'
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Calendar, BookOpen, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';
import BannerSlider from '@/components/BannerSlider';



export default function Home() {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

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

  // FAQ Data
  const faqs = [
    {
      question: "What is BAESA?",
      answer:
        "Bangladesh Atomic Energy Scientist's Association (BAESA) is a professional organization dedicated to advancing atomic energy science, promoting research collaboration, and fostering scientific excellence among nuclear scientists in Bangladesh.",
    },
    {
      question: "How can I become a member of BAESA?",
      answer:
        "Scientists and researchers working in the field of atomic energy can apply for membership through our online application portal. Applicants must hold relevant qualifications and be employed in nuclear science-related positions.",
    },
    {
      question: "What benefits do BAESA members receive?",
      answer:
        "Members enjoy access to exclusive research resources, networking opportunities, professional development workshops, scientific conferences, publication opportunities, and collaboration with leading scientists in the field.",
    },
    {
      question: "Does BAESA organize conferences and seminars?",
      answer:
        "Yes, BAESA regularly organizes national and international conferences, seminars, workshops, and training programs to facilitate knowledge sharing and professional development in nuclear science.",
    },
    {
      question: "How can I contact BAESA?",
      answer:
        "You can reach us through our contact page, email us at info@baesa.org.bd, or call our office at +880-2-9112314. Our office is located at Bangladesh Atomic Energy Commission, Dhaka.",
    },
  ];

  // Recent Events
  const recentEvents = [
    {
      id: 1,
      title: "International Nuclear Science Conference 2025",
      date: "March 15-17, 2025",
      description:
        "Join leading scientists from around the world to discuss latest advances in nuclear technology.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Workshop on Radiation Safety",
      date: "February 20, 2025",
      description:
        "Comprehensive training on radiation safety protocols and best practices for nuclear facilities.",
      image:
        "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Annual General Meeting 2025",
      date: "January 28, 2025",
      description:
        "Annual gathering of BAESA members to discuss achievements and plan future initiatives.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
    },
  ];

  // Achievements
  const achievements = [
    { number: "500+", label: "Research Papers Published", icon: BookOpen },
    { number: "150+", label: "Active Scientists", icon: Users },
    { number: "25+", label: "International Collaborations", icon: Award },
    { number: "40+", label: "Years of Excellence", icon: CheckCircle },
  ];

 
  return (
    <div className=" bg-white">
      {/* Banner Slider */}
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

      {/* About Section with Image */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Bangladesh Atomic Energy Scientist's Association (BAESA) is a
              premier organization dedicated to advancing nuclear science and
              technology in Bangladesh. We bring together brilliant minds in the
              field of atomic energy to foster innovation, collaboration, and
              scientific excellence.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Since our establishment, we have been at the forefront of nuclear
              research, promoting sustainable energy solutions and contributing
              to national development through cutting-edge scientific research.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
              Read More About Us
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop"
                alt="BAESA Scientists"
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
                <p className="text-4xl font-bold">40+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className="text-4xl font-bold mb-2">{item.number}</p>
                  <p className="text-blue-100">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Recent Events & News
          </h2>
          <p className="text-gray-600 text-lg">
            Stay updated with our latest activities and upcoming events
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parallax Banner */}
      <div
        className="relative h-96 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Shape the Future of Nuclear Science
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our community of leading scientists and researchers
            </p>
            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl text-lg">
              Become a Member Today
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about BAESA
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-left font-semibold text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? "max-h-48" : "max-h-0"
                }`}
              >
                <div className="px-6 py-4 bg-gray-50 text-gray-600 border-t border-gray-200">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Ready to Collaborate?
          </h2>
          <p className="text-blue-900 text-lg mb-6">
            Connect with us to explore research opportunities and partnerships
          </p>
          <button className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-200 shadow-lg">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}
