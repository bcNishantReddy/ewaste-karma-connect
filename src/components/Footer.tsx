
import React from "react";
import { Link } from "react-router-dom";
import { Recycle, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Recycle className="h-8 w-8 text-eco-green-400" />
              <span className="ml-2 text-xl font-bold">E-Waste Karma Connect</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Transforming the unorganized e-waste market into a structured, rewarding ecosystem for all stakeholders.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-eco-green-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-eco-green-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-eco-green-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-eco-green-400 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href="mailto:info@ewastekarma.com" className="text-gray-400 hover:text-white text-sm">
                  info@ewastekarma.com
                </a>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white text-sm">
                  +91 98765 43210
                </a>
              </li>
              <li className="text-gray-400 text-sm mt-4">
                123 Eco Street, Green Park,<br />
                New Delhi, India 110001
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} E-Waste Karma Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
