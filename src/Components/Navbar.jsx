import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "EVENT-SHEDULE", path: "/events-shedule" },
    { name: "GALLERY", path: "/gallery" },
    { name: "SERVICES", path: "/services" },
    { name: "SPONSORS", path: "/sponsors" },
    { name: "CONTACT US", path: "/contact" },
    { name: "VISITORS", path: "/visitors" },
    { name: "ABOUT US", path: "/about" },
  ];

  return (
    <nav className="bg-orange-400 shadow-md sticky top-0 z-50 px-4 sm:px-6 lg:px-10 xl:px-20">
      <hr className="text-black" />
      <div className="container-custom">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full flex items-center justify-center">
              <img
                className="bg-white rounded-full h-10 w-10 sm:h-12 sm:w-12"
                src="Logo.AVIF"
                alt="logo"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-base md:text-lg font-semibold text-black">
                Buzz. Matrix. India.
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs xl:text-sm font-bold text-white hover:text-black transition-colors duration-300 whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="lg:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-2">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-black hover:text-[#1F4E8C] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;