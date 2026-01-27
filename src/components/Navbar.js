"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const menuItems = [
    { name: "ABOUT", link: "/about" },
    {
      name: "BAESA EXECUTIVES",
      link: "/executives",
      hasSubmenu: true,
      submenu: [
        { name: "BAESA 2025-26", link: "/executives" },
        { name: "BAESA 2024-25", link: "/" },
        { name: "BAESA 2016-17", link: "/" },
        { name: "BAESA 2014-15", link: "/" },
      ],
    },
    {
      name: "BAESA MEMBERS",
      link: "/members",
    },
    { name: "NEWS AND EVENTS", link: "/news" },
    { name: "PHOTO GALLERY", link: "/gallery" },
    { name: "MESSAGES", link: "/members" },
    { name: "CONTACT", link: "/contact" },
  ];
  return (
    <nav className="w-full bg-white shadow-md">
      {/* Header Top Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-10">
              {/* Logo */}
              <Link href="/">
                <div className=" hidden lg:flex w-16 h-16 md:w-24 md:h-24 bg-white rounded-lg shadow-md flex items-center justify-center border-2 border-blue-900">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-24 md:h-24 border-2 rounded-lg border-blue-900 rotate-0 flex items-center justify-center">
                      <Image src={logo} alt="logo" width={500} height={500} />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Title */}
              <div className="flex flex-col items-center">
                <h1 className="text-xl md:text-4xl font-bold text-blue-900 leading-tight">
                  <span className="block">
                    বাংলাদেশ পরমাণু শক্তি বিজ্ঞানী সংঘ (বায়েসা)
                  </span>
                </h1>
                <p className="text-sm md:text-2xl text-blue-800 mt-1 font-medium">
                  Bangladesh Atomic Energy Scientist's Association (BAESA)
                </p>
                <p className="text-sm md:text-base text-blue-800 mt-1 font-medium">
                  পরমাণু ভবন, ই-১২/এ, আগারগাও, শেরেবাংলা নাগর, ঢাকা-১২০৭,
                  বাংলাদেশ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b-2 border-t-2 border-blue-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="flex justify-between items-center w-full">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.hasSubmenu ? (
                    <div className="relative h-full">
                      <button className="h-full px-6 py-3 text-sm font-semibold text-black bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-center uppercase whitespace-nowrap">
                        {item.name}
                      </button>

                      {/* Submenu */}
                      <div className="absolute left-0 top-full w-full min-w-[200px] bg-white border-2 border-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.link}
                            className="block px-4 py-2.5 text-sm text-black hover:bg-gray-100 border-b border-black last:border-b-0 uppercase"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      className="block h-full px-6 py-3 text-sm font-semibold text-black bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-center uppercase whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between py-4">
            {/* logo */}
            <Link href="/">
              <div className="w-16 h-16 bg-white flex items-center justify-center">
                <Image src={logo} alt="logo" width={500} height={500} />
              </div>
            </Link>
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
          className="fixed inset-0 bg-white/20 backdrop-blur-xs z-40 lg:hidden"
        />
      )}
    </nav>
  );
}

export default Navbar;
