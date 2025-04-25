import React, { useState, useEffect } from "react";
import regel from "../../../assets/images/regel.svg";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navLinks = [
    { text: "Degenerative Disc Disease", href: "#" },
    { text: "Study Overview", href: "#" },
    { text: "Study Locations", href: "#" },
    { text: "Do I Qualify", href: "#" },
    { text: "FAQs", href: "#" },
  ];

  return (
    <header className="w-full bg-white shadow-sm mb-2">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div>
          <img src={regel} alt="logo" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-700 hover:text-cyan-500 transition-colors font-medium"
            >
              {link.text}
            </a>
          ))}
          <button className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition-colors font-medium">
            See If You Qualify
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {openNav && (
        <div className="lg:hidden px-4 py-2 bg-white shadow-md">
          <nav className="flex flex-col space-y-3 pb-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-cyan-500 py-1"
              >
                {link.text}
              </a>
            ))}
            <button className="bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-600 transition-colors w-full">
              See If You Qualify
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
