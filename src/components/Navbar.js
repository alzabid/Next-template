"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const menuItems = [
    { name: "ABOUT", link: "#about" },
    { name: "BAESA EXECUTIVES", link: "#executives" },
    {
      name: "BAESA MEMBERS",
      link: "#members",
      hasSubmenu: true,
      submenu: [
        { name: "BAESA 2024-25", link: "#2024-25" },
        { name: "BAESA 2016-17", link: "#2016-17" },
        { name: "BAESA 2014-15", link: "#2014-15" },
      ],
    },
    { name: "NEWS AND EVENTS", link: "#news" },
    { name: "PHOTO GALLERY", link: "#gallery" },
    { name: "MESSAGES", link: "#messages" },
    { name: "CONTACT", link: "#contact" },
  ];
  return (
    <nav className="w-full bg-white shadow-md">
      {/* Header Top Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-900">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg shadow-md flex items-center justify-center border-2 border-blue-900">
                <div className="relative">
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 border-2 border-blue-900 rotate-0 flex items-center justify-center"
                    style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
                  >
                    <div className="flex flex-col items-center justify-center text-blue-900 text-xs">
                      <span className="font-bold">⚛</span>
                      <span className="font-bold">⚡</span>
                      <span className="font-bold">⚙</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col">
                <h1 className="text-xl md:text-3xl font-bold text-blue-900 leading-tight">
                  <span className="block">বাংলাদেশ পরমাণু শক্তি</span>
                  <span className="block">বিজ্ঞানী সমিতি</span>
                </h1>
                <p className="text-sm md:text-base text-blue-800 mt-1 font-medium">
                  Bangladesh Atomic Energy Scientist's Association (BAESA)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-stretch border border-black">
            <ul className="flex items-stretch w-full">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="relative group border-r border-black last:border-r-0"
                >
                  {item.hasSubmenu ? (
                    <div className="relative h-full">
                      <button className="h-full px-6 py-3 text-sm font-semibold text-black bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-center uppercase whitespace-nowrap">
                        {item.name}
                      </button>

                      {/* Submenu */}
                      <div className="absolute left-0 top-full w-full min-w-[200px] bg-white border border-black border-t-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="bg-gray-50 px-4 py-2 border-b border-black text-xs font-bold uppercase">
                          SUB-MENU
                        </div>
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.link}
                            className="block px-4 py-2.5 text-sm text-black hover:bg-gray-100 border-b border-black last:border-b-0 uppercase"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      className="block h-full px-6 py-3 text-sm font-semibold text-black bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-center uppercase whitespace-nowrap"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between py-4">
            <span className="text-lg font-bold text-blue-900">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-900">
          <h2 className="text-lg font-bold text-white">Navigation</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          <ul className="py-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                      className="w-full flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors border-b border-gray-100"
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isSubMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Submenu Items */}
                    <div
                      className={`bg-gray-50 overflow-hidden transition-all duration-200 ${
                        isSubMenuOpen ? "max-h-48" : "max-h-0"
                      }`}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-10 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-900 border-b border-gray-200 last:border-b-0"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors border-b border-gray-100 font-medium"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}
    </nav>
  );
}

export default Navbar;
