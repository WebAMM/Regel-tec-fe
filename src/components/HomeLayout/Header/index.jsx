import React, { useState, useEffect } from "react";
import regel from "../../../assets/images/regel.svg";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleClickScroll = (id) => {
    const element = document.getElementById(`${id}`);
    if (element) {
      const navbarHeight = 100; // Adjust this based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navLinks = [
    { text: "Degenerative Disc Disease", href: "Degenerative Disc" },
    { text: "Study Overview", href: "Study Overview" },
    { text: "Study Locations", href: "nearLocation" },
    { text: "Do I Qualify", href: "qualify" },
    { text: "FAQs", href: "FAQs" },
  ];

  return (
    <header className="w-full bg-white z-[1001] shadow-sm mb-2 fixed top-0 left-0">
      <div className="container mx-auto xl:px-0 lg:px-8 md:px-5 px-5 flex items-center justify-between lg:pt-10 md:pt-8 pt-8 py-3">
        {/* Logo */}
        <div
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={regel} alt="logo" className="responsive_logo" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center xl:space-x-6 lg:space-x-2 space-x-2">
          {navLinks.map((link, index) => (
            <div
              key={index}
              // href={link.href}
              className="text-gray-700 hover:text-cyan-500 transition-colors font-medium cursor-pointer lg:text-center text-center"
              onClick={() => handleClickScroll(link.href)}
            >
              {link.text}
            </div>
          ))}
          <button
            onClick={() => handleClickScroll("qualify")}
            type="button"
            className="cursor-pointer bg-[#00B4F1] text-white xl:px-6 lg:px-3 px-3 xl:py-[12px] lg:py-[10px] md:py-[8px] py-[8px] lg:text-[16px] md:text-sm sm:text-xs  text-xs rounded-full hover:bg-cyan-600 transition-colors font-normal header_qualify"
          >
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
              stroke="#000000"
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
              stroke="#000000"
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
            <button
              onClick={() => handleClickScroll("qualify")}
              className="cursor-pointer bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-600 transition-colors w-full lg:text-[16px] md:text-sm sm:text-xs  text-xs"
            >
              See If You Qualify
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
