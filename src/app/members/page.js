"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Mail,
  Award,
  Building2,
  Users,
  Filter,
  MailCheck,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getMembers, getSetting } from "@/lib/api";

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [membersPdf, setMembersPdf] = useState("");

  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        const res = await getMembers("MEMBER");
        setMembers(res.data || []);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchSettings = async () => {
      try {
        const res = await getSetting("members_pdf");
        if (res.data) setMembersPdf(res.data.value);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchMembersData();
    fetchSettings();
  }, []);

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
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || member.department === selectedDepartment;
    const matchesYear = selectedYear === "All" || member.year === selectedYear;
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const memberStats = {
    total: members.length,
    departments: [...new Set(members.map((m) => m.department))].length,
    years: [...new Set(members.map((m) => m.year))].length,
  };

  const handleDownloadPDF = () => {
    if (membersPdf) {
      const link = document.createElement("a");
      link.href = membersPdf;
      link.download = "BAESA_Members_List.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No PDF document is available for download at the moment.");
    }
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
            {/* <div className="flex-1">
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
            </div> */}

            {/* Department Filter */}
            {/* <div className="md:w-[400]">
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
            </div> */}

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

            {/* Download Button */}
            <div className="ml-auto flex items-center">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg transition-colors shadow-md font-semibold"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredMembers.length} of {members.length} scientists
          </div>
        </div>

        {/* Members Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-800 text-white text-sm uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">
                      Name
                    </th>
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">
                      Designation (BAEC)
                    </th>
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">
                      Mobile Number
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 min-w-[250px]">
                        <div className="flex items-center gap-4">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-lg shadow-sm">
                              {member.name?.charAt(0) || "M"}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-800 text-base">
                              {member.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 min-w-[300px]">
                        <div className="flex items-start gap-2">
                          <Building2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 font-medium">
                            {member.department || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 min-w-[150px]">
                        <p className="text-sm font-semibold text-gray-700">
                          {member.phone || "N/A"}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
