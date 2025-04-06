
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      title: "Post Your E-Waste",
      description: "Users share what e-waste they have along with preferred pickup times and location",
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
    <div className="py-16 bg-gray-50">
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
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 flex-1 relative">
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

        <div className="mt-12 text-center">
          <Link to="/login?tab=register">
            <Button className="px-8 py-3 bg-eco-green-600 hover:bg-eco-green-700">
              Join Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        
        {/* Testimonials Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                What Our Users Say
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Real experiences from our community members
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <p className="text-gray-600 italic">
                  "I've been collecting waste for 15 years, but this platform has completely transformed my business. I now get more pickup requests and can connect directly with large recyclers."
                </p>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-eco-green-100 flex items-center justify-center">
                      <span className="text-eco-green-800 font-bold">RK</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Rajesh Kumar</h3>
                    <p className="text-xs text-gray-500">Kabadiwalla, Delhi</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <p className="text-gray-600 italic">
                  "As a recycling plant, finding consistent sources of e-waste was always challenging. This platform has given us access to a steady supply through verified kabadiwallas."
                </p>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-eco-blue-100 flex items-center justify-center">
                      <span className="text-eco-blue-800 font-bold">SP</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Sanjay Patel</h3>
                    <p className="text-xs text-gray-500">GreenTech Recyclers</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <p className="text-gray-600 italic">
                  "I never knew what to do with my old electronics. Now I can easily request a pickup, earn karma points, and feel good knowing my e-waste is being properly recycled."
                </p>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-eco-orange-100 flex items-center justify-center">
                      <span className="text-eco-orange-800 font-bold">AG</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Ananya Gupta</h3>
                    <p className="text-xs text-gray-500">User, Mumbai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-eco-green-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to make a difference?</span>
              <span className="block text-eco-green-200">Join our growing community today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link to="/login?tab=register">
                  <Button className="px-6 py-3 text-base font-medium bg-white text-eco-green-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link to="/how-it-works">
                  <Button variant="outline" className="px-6 py-3 text-base font-medium border-white text-white hover:bg-eco-green-700">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
