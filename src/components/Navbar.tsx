
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu,
  X,
  Recycle
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/95 border-b border-gray-100 backdrop-blur-sm fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-eco-green-600 text-xl font-bold"
            >
              <Recycle className="h-7 w-7 text-eco-green-500" />
              <span className="hidden md:block">E-Waste Karma Connect</span>
              <span className="md:hidden">E-Karma</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-eco-green-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-eco-green-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-eco-green-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-eco-green-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Contact
            </Link>
            <Link to="/login">
              <Button size="sm" variant="outline" className="ml-2">
                Login
              </Button>
            </Link>
            <Link to="/login?tab=register">
              <Button size="sm" className="bg-eco-green-600 hover:bg-eco-green-700">
                Join Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-eco-green-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-eco-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-eco-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-eco-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-eco-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link 
                to="/login"
                onClick={toggleMenu}
                className="w-full"
              >
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link 
                to="/login?tab=register"
                onClick={toggleMenu}
                className="w-full"
              >
                <Button className="w-full bg-eco-green-600 hover:bg-eco-green-700">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
