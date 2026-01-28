import {
  Target,
  Eye,
  Award,
  Users,
  Lightbulb,
  Heart,
  BookOpen,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  // Timeline data
  const timeline = [
    {
      year: "1984",
      title: "Foundation of BAESA",
      description:
        "Bangladesh Atomic Energy Scientist's Association was established with a vision to advance nuclear science in Bangladesh.",
    },
    {
      year: "1995",
      title: "First International Conference",
      description:
        "Organized the first international nuclear science conference, bringing together scientists from across Asia.",
    },
    {
      year: "2005",
      title: "Research Excellence Award",
      description:
        "BAESA received national recognition for outstanding contributions to nuclear research and development.",
    },
    {
      year: "2015",
      title: "Global Partnerships",
      description:
        "Established collaborations with leading international atomic energy organizations and research institutions.",
    },
    {
      year: "2025",
      title: "Continuing Innovation",
      description:
        "Leading Bangladesh's nuclear science community with cutting-edge research and sustainable energy solutions.",
    },
  ];

  // Core values
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We foster creativity and innovation in nuclear science research, encouraging breakthrough discoveries.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We maintain the highest standards of scientific excellence and professional integrity in all our activities.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of collaboration, bringing together scientists to achieve common goals.",
    },
    {
      icon: Heart,
      title: "Safety",
      description:
        "We prioritize safety in all nuclear science activities, ensuring protection of people and environment.",
    },
    {
      icon: BookOpen,
      title: "Knowledge Sharing",
      description:
        "We promote education and knowledge dissemination in nuclear science through various platforms.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "We strive to contribute to global nuclear science advancement and sustainable development.",
    },
  ];

  // Leadership team
  const leadership = [
    {
      name: "Dr. Abdul Mannan",
      position: "President",
      image: "https://via.placeholder.com/300x300/2563eb/ffffff?text=AM",
      bio: "Leading nuclear physicist with 30+ years of experience",
    },
    {
      name: "Dr. Rashida Begum",
      position: "Vice President",
      image: "https://via.placeholder.com/300x300/1e40af/ffffff?text=RB",
      bio: "Expert in radiation safety and nuclear medicine",
    },
    {
      name: "Dr. Kamal Ahmed",
      position: "General Secretary",
      image: "https://via.placeholder.com/300x300/2563eb/ffffff?text=KA",
      bio: "Specialist in nuclear engineering and reactor physics",
    },
    {
      name: "Dr. Nasreen Khan",
      position: "Treasurer",
      image: "https://via.placeholder.com/300x300/1e40af/ffffff?text=NK",
      bio: "Renowned researcher in nuclear agriculture",
    },
  ];
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
              About BAESA
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Empowering Nuclear Science Excellence in Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Bangladesh Atomic Energy Scientist's Association (BAESA) is the
            premier professional organization representing atomic energy
            scientists and researchers in Bangladesh. Since our establishment in
            1984, we have been dedicated to advancing nuclear science, promoting
            research excellence, and contributing to national development
            through peaceful applications of atomic energy.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our association brings together brilliant minds from various
            disciplines including nuclear physics, radiation safety, nuclear
            medicine, and nuclear agriculture, creating a collaborative
            ecosystem for scientific innovation and knowledge exchange.
          </p>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To advance the field of nuclear science in Bangladesh by
                fostering research excellence, promoting professional
                development, facilitating scientific collaboration, and
                contributing to sustainable national development through
                peaceful applications of atomic energy while maintaining the
                highest standards of safety and ethics.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be recognized as the leading scientific association in
                Bangladesh, driving innovation in nuclear science and
                technology, producing world-class researchers, and positioning
                Bangladesh as a significant contributor to global nuclear
                science advancement for the betterment of humanity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-lg">
            The principles that guide our work and define our culture
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              Our Journey
            </h2>
            <p className="text-blue-900 text-lg">
              Milestones in our history of excellence
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400" />

            {timeline.map((item, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                <div
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0
                        ? "md:text-right md:pr-8"
                        : "md:text-left md:pl-8"
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="text-blue-600 font-bold text-2xl mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Circle */}
                  <div className="hidden md:flex items-center justify-center w-2/12">
                    <div className="w-6 h-6 bg-white rounded-full border-4 border-blue-400 z-10" />
                  </div>

                  {/* Empty space */}
                  <div className="hidden md:block w-5/12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Leadership
          </h2>
          <p className="text-gray-600 text-lg">
            Meet the distinguished scientists leading BAESA
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((leader, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600 group"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {leader.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {leader.position}
                </p>
                <p className="text-gray-600 text-sm">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                150+
              </div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Research Papers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                25+
              </div>
              <div className="text-gray-600">Collaborations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                40+
              </div>
              <div className="text-gray-600">Years Legacy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Join Our Scientific Community
          </h2>
          <p className="text-blue-800 text-lg mb-8">
            Be part of Bangladesh's leading atomic energy scientists association
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2">
              Become a Member
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent border-2 border-blue-800 text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
