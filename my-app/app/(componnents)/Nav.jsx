"use client";
import { useState } from "react";
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NAV_LINKS } from "@/app/constants";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between bg-nav p-4 relative">
      <div className="flex justify-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div className="lg:hidden relative">
        <button onClick={toggleMenu} className="block text-gray-50">
          {/* Hamburger icon */}
          <div className="w-6 h-0.5 bg-gray-50 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-50 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-50"></div>
        </button>
        {isMenuOpen && (
          <div className="absolute w-36 top-full right-0 bg-white shadow-md rounded-lg mt-2">
            {/* Render links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="block py-2 px-4 text-black hover:bg-gray-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="hidden h-full gap-12 lg:flex">
        {/* Render links */}
        {NAV_LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div>
        <Link
          key="login"
          href="/login"
          className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Nav;

/*import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NAV_LINKS } from "@/app/constants";
import Image from "next/image";

function Nav() {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex justify-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Image
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden text-gray-50 "      />

      <div>
        <p className="text-default-text">abas@gmail.com</p>
      </div>
    </nav>
  );
}

export default Nav;*/
