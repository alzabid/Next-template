"use client";
import { useState } from "react";
import {
  Search,
  Mail,
  Award,
  Building2,
  Users,
  Filter,
  MailCheck,
} from "lucide-react";

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Sample members data
  const members = [
    {
      id: 1,
      name: "Dr. Md. Asad Shariff",
      title: "Director & Chief Scientific Officer",
      department: "Bangladesh Atomic Energy Commission",
      email: "asad_shariff_roni@yahoo.com",
      joinYear: "2024",
      image:
        "https://baec.org.bd/uploads/images/researchers/1757845365_cropped_image.png",
    },
    {
      id: 2,
      name: "Dr. Afroja Sultana",
      title: "Medical Officer",
      department: "National Institute of Nuclear Medicine & Allied Sciences",
      email: "afrojasultanashukhi@gmail.com",
      joinYear: "2024",
      image: "https://baec.org.bd/assets/image_placeholder.png",
    },
    {
      id: 3,
      name: "Dr. Mohammad Rajib",
      title: "Principal Geologist",
      department: "Institute of Nuclear Geological Sciences",
      email: "rajib.mohammad@gmail.com",
      joinYear: "2024",
      image:
        "https://baec.org.bd/uploads/images/researchers/1763444837_cropped_image.png",
    },
    {
      id: 4,
      name: "Dr. Md. Abdullah Al Mamun",
      title: "Principal Scientific Officer",
      department: "Atomic Energy Centre, Dhaka",
      email: "mamun.aec@baec.gov.bd",
      joinYear: "2016",
      image:
        "https://baec.org.bd/uploads/images/researchers/1765797505_cropped_image.png",
    },
    {
      id: 5,
      name: "Dr. Azmal Kabir Sarker",
      title: "Principal Medical Officer",
      department: "Institute of Nuclear Medicine & Allied Sciences, Suhrawardi",
      email: "azmalbaec@gmail.com",
      joinYear: "2016",
      image: "https://baec.org.bd/assets/image_placeholder.png",
    },
    {
      id: 6,
      name: "Mr. Md. Mosharraf Hosain",
      title: "Scientific Officer",
      department: "Institute of Food and Radiation Biology",
      email: "mosharrafjnu722@gmaiI.com",
      joinYear: "2014",
      image: "https://baec.org.bd/assets/image_placeholder.png",
    },
    {
      id: 7,
      name: "Mr. Md. Aliuzzaman",
      title: "Principal Scientific Officer",
      department:
        "Bangladesh Atomic Energy Commission",
      email: "palash.eng07@gmail.com",
      joinYear: "2014",
      image: "https://baec.org.bd/assets/image_placeholder.png",
    },
    // {
    //   id: 8,
    //   name: "Dr. Ayesha Siddiqua",
    //   title: "Principal Scientist",
    //   department: "Nuclear Agriculture",
    //   email: "dr.siddiqua@baesa.org.bd",
    //   joinYear: "2024",
    //   image: "https://via.placeholder.com/200x200/1e40af/ffffff?text=AS",
    // },
  ];

  const departments = [
    "Select Institute",
    "Bangladesh Atomic Energy Commission",
    "National Institute of Nuclear Medicine & Allied Sciences",
    "Institute of Nuclear Geological Sciences",
    "Atomic Energy Centre, Dhaka",
    "Institute of Nuclear Medicine & Allied Sciences, Suhrawardi",
    "Institute of Food and Radiation Biology",
  ];
  const years = ["All", "2024", "2016", "2014"];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || member.department === selectedDepartment;
    const matchesYear =
      selectedYear === "All" || member.joinYear === selectedYear;
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const memberStats = {
    total: members.length,
    departments: [...new Set(members.map((m) => m.department))].length,
    years: [...new Set(members.map((m) => m.joinYear))].length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Page Header */}
      <div className=" text-blue-800 py-16">
        <div className="text-center max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Scientists
          </h1>
          <p className="text-blue-900 text-lg">
            Meet the brilliant minds advancing atomic energy science in
            Bangladesh
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      {/* <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Members</p>
                <p className="text-3xl font-bold text-gray-800">
                  {memberStats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Departments</p>
                <p className="text-3xl font-bold text-gray-800">
                  {memberStats.departments}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Batches</p>
                <p className="text-3xl font-bold text-gray-800">
                  {memberStats.years}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className=" text-black absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div className="md:w-[400]">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-3  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year Filter */}
            {/* <div className="md:w-48">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="All">All Years</option>
                {years
                  .filter((y) => y !== "All")
                  .map((year) => (
                    <option key={year} value={year}>
                      BAESA {year}
                    </option>
                  ))}
              </select>
            </div> */}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredMembers.length} of {members.length} scientists
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600 group"
            >
              {/* Member Image */}
              <div className="relative h-72 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {member.joinYear}
                </div> */}
              </div>

              {/* Member Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  {member.title}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600">{member.department}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MailCheck className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    {/* <Award className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" /> */}
                    <p className="text-xs text-gray-600">{member.email}</p>
                  </div>
                </div>

                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 text-sm font-semibold"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Scientists Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Join Us Section */}
      <div className=" text-blue-800 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in Joining BAESA?
          </h2>
          <p className="text-blue-800 mb-6 text-lg">
            We welcome qualified scientists and researchers to join our
            community
          </p>
          <button className="bg-blue-800 text-white px-8 py-3 rounded-lg cursor-pointer font-semibold hover:bg-blue-900 transition-colors duration-200 shadow-lg">
            Apply for Membership
          </button>
        </div>
      </div>
    </div>
  );
}
