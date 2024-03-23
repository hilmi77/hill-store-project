import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/acik-renk. .webp"; // Logo yolu doğru olduğundan emin olun

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-[80px]" />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/favoriler" className="hover:underline">
            Favoriler
          </Link>
          <Link to="#" className="hover:underline">
            Alışveriş Sepeti
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2">
          <Link to="/favorites" className="hover:underline">
            Favoriler
          </Link>
          <Link to="/cart" className="hover:underline">
            Alışveriş Sepeti
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
