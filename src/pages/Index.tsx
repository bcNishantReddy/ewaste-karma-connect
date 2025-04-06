
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { ArrowRight, Recycle, Clock, MapPin } from "lucide-react";
import KabadiwalaMap from "@/components/KabadiwalaMap";
import About from "@/components/About";
import Contact from "@/components/Contact";
import RedeemStore from "@/components/RedeemStore";

const HowItWorks = () => {
  const steps = [
    {
      title: "Post Your E-Waste",
      description: "Share what e-waste you have along with preferred pickup times and location",
      icon: <Recycle className="h-8 w-8 text-white" />,
      color: "bg-eco-green-500",
    },
    {
      title: "Kabadiwallas Collect",
      description: "Nearby kabadiwallas see your request and arrange for collection at your convenience",
      icon: <MapPin className="h-8 w-8 text-white" />,
      color: "bg-eco-blue-500",
    },
    {
      title: "Verified Collection",
      description: "The kabadiwalla takes a photo as proof of collection, triggering your karma points",
      icon: <Clock className="h-8 w-8 text-white" />,
      color: "bg-eco-orange-500",
    },
  ];

  return (
    <div id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our simple process makes e-waste recycling easy and rewarding for everyone
          </p>
        </div>

        <div className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 md:space-x-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 flex-1 relative transform transition-transform hover:scale-105">
                <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 ${step.color} rounded-full p-3`}>
                  {step.icon}
                </div>
                <div className="text-center mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mt-2">{step.title}</h3>
                  <p className="mt-4 text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    // Handle anchor links in URL
    const handleAnchorLink = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Run on initial load
    handleAnchorLink();

    // Listen for hash changes
    window.addEventListener('hashchange', handleAnchorLink);
    return () => {
      window.removeEventListener('hashchange', handleAnchorLink);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <KabadiwalaMap />
        <RedeemStore />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
