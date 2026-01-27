import { Mail, Phone, Award, Users } from "lucide-react";

export default function ExecutivesPage() {
  // Executive members data
  const executives = [
    {
      id: 1,
      name: "ড. এ এস এন সাইফুল্লাহ",
      nameEn: "Dr. A S N Saifullah",
      position: "সভাপতি",
      positionEn: "President",
      image: "https://via.placeholder.com/300x300/2563eb/ffffff?text=President",
      email: "president@baesa.org.bd",
      phone: "+880-XXX-XXXXXX",
      department: "Nuclear Physics",
    },
    {
      id: 2,
      name: "ড. আবু বকর সিদ্দিক",
      nameEn: "Dr. Abu Bakar Siddique",
      position: "সহ-সভাপতি",
      positionEn: "Vice President",
      image: "https://via.placeholder.com/300x300/1e40af/ffffff?text=VP",
      email: "vp@baesa.org.bd",
      phone: "+880-XXX-XXXXXX",
      department: "Radiation Safety",
    },
    {
      id: 3,
      name: "ড. মোঃ মাহবুবুল হক",
      nameEn: "Dr. Md. Mahbubul Haque",
      position: "কোষাধ্যক্ষ",
      positionEn: "Treasurer",
      image:
        "https://scontent-sin6-1.xx.fbcdn.net/v/t39.30808-6/504433381_10237949971906332_7491224736133767266_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=TB5QCyrCIygQ7kNvwFd4DZq&_nc_oc=Adm98LEI2ogAx3bg0G1nDExUBpR-F6Q6dd6l8MMeDNHe7cMANUuPaxGRKayYL96NpcLzSL-idXm9NGkb9yWUu5Bc&_nc_zt=23&_nc_ht=scontent-sin6-1.xx&_nc_gid=MNS05BYhsof66WCSTnmDjA&oh=00_AfqH94l2XCjGkaZQ3lHFPUXoeeJQ7y4S_lDX8PQujAkyhQ&oe=697D4DE7",
      email: "treasurer@baesa.org.bd",
      phone: "+880-XXX-XXXXXX",
      department: "Nuclear Engineering",
    },
    {
      id: 4,
      name: "ড. মোঃ গোলাম রসুল",
      nameEn: "Dr. Md. Golam Rasul",
      position: "সাধারণ সম্পাদক",
      positionEn: "General Secretary",
      image: "https://via.placeholder.com/300x300/1e40af/ffffff?text=GS",
      email: "secretary@baesa.org.bd",
      phone: "+880-XXX-XXXXXX",
      department: "Nuclear Medicine",
    },
    {
      id: 5,
      name: "ড. মোঃ ফিরোজ মর্তুজা",
      nameEn: "Dr. Md. Firoz Mortuza",
      position: "সহ-সাধারণ সম্পাদক",
      positionEn: "Joint Secretary",
      image: "https://via.placeholder.com/300x300/2563eb/ffffff?text=JS",
      email: "jointsecretary@baesa.org.bd",
      phone: "+880-XXX-XXXXXX",
      department: "Nuclear Agriculture",
    },
    {
      id: 6,
      name: "প্রফে. মোঃ আল মামুন",
      nameEn: "Prof. Md. Al Mamun",
      position: "তথ্য ও প্রকাশনা সম্পাদক",
      positionEn: "Information & Publication Secretary",
      image: "https://via.placeholder.com/300x300/1e40af/ffffff?text=IP",
      email: "publication@baesa.org.bd",
      phone: "+880-XXX-XXXXXX",
      department: "Nuclear Physics",
    },
  ];

  // Statistics
  const stats = [
    { number: "6", label: "Executive Members", icon: Users },
    { number: "40+", label: "Years of Service", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            BAESA Executives
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-100 mb-4 text-center">
            বিএইএসএ নির্বাহী পরিষদ
          </h2>
          <p className="text-blue-100 text-lg text-center">
            Meet our distinguished leadership team
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.number}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Executives Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-gray-600 text-lg">
            Dedicated scientists leading BAESA with vision and expertise
          </p>
        </div>

        {/* Executives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executives.map((executive) => (
            <div
              key={executive.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-600 group"
            >
              {/* Profile Image */}
              <div className="relative h-72 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
                <img
                  src={executive.image}
                  alt={executive.nameEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Position Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-blue-600 font-bold text-sm text-center">
                      {executive.positionEn}
                    </p>
                    <p className="text-gray-700 font-semibold text-xs text-center">
                      {executive.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Executive Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1 text-center group-hover:text-blue-600 transition-colors">
                  {executive.nameEn}
                </h3>
                <p className="text-gray-600 text-center mb-4 font-medium">
                  {executive.name}
                </p>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-gray-700 font-medium">
                        {executive.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <a
                      href={`mailto:${executive.email}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors text-xs truncate"
                    >
                      {executive.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <a
                      href={`tel:${executive.phone}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors text-xs"
                    >
                      {executive.phone}
                    </a>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="mt-6">
                  <a
                    href={`mailto:${executive.email}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-200 text-center font-semibold text-sm"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Working Together for Scientific Excellence
            </h3>
            <p className="text-blue-100 text-lg mb-6">
              Our executive team is committed to advancing nuclear science
              research and development in Bangladesh, fostering international
              collaborations, and ensuring the highest standards of scientific
              integrity.
            </p>
            <p className="text-blue-200 text-base">
              আমাদের নির্বাহী দল বাংলাদেশে পরমাণু বিজ্ঞান গবেষণা ও উন্নয়নে
              অগ্রগতি, আন্তর্জাতিক সহযোগিতা বৃদ্ধি এবং বৈজ্ঞানিক সততার সর্বোচ্চ
              মান নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Have Questions for Our Executives?
          </h3>
          <p className="text-gray-600 mb-6">
            Feel free to reach out to any of our executive members for inquiries
            or collaboration opportunities
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
