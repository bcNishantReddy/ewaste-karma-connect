
import React from "react";
import { Recycle, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Recycle className="h-8 w-8 text-eco-green-400" />
            <span className="ml-2 text-xl font-bold">VentureTech</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="mailto:info@venturetech.com" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5 mr-1" />
              <span>info@venturetech.com</span>
            </a>
            <a href="tel:+919876543210" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Phone className="h-5 w-5 mr-1" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-800 pt-6">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} VentureTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
