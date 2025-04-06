
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIG9wYWNpdHk9IjAuMDUiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1MC43MDkgMTM5LjUyM0MxNTMuNTk2IDE0Mi4zMDYgMTUzLjY5IDE0Ni43OTkgMTUwLjkwNyAxNDkuNjg1TDEzOS4wNiAxNjEuOTIxQzEzNi4yNzcgMTY0LjgwOCAxMzEuNzgzIDE2NC45MDIgMTI4Ljg5NyAxNjIuMTE5QzEyNi4wMTEgMTU5LjMzNSAxMjUuOTE2IDE1NC44NDIgMTI4LjcgMTUxLjk1NkwxNDAuNTQ3IDEzOS43MTlDMTQzLjMzIDEzNi44MzMgMTQ3LjgyNCAxMzYuNzM5IDE1MC43MDkgMTM5LjUyM1pNMTUwLjkwNyA1MC4zMTUzQzE1My42OSA1My4yMDExIDE1My41OTYgNTcuNjk0MyAxNTAuNzA5IDYwLjQ3NzFDMTQ3LjgyNCA2My4yNjExIDQzLjMzIDYzLjE2NyAxNDAuNTQ3IDYwLjI4MTJMMTI4LjcgNDguMDQ0M0MxMjUuOTE2IDQ1LjE1ODUgMTI2LjAxMSA0MC42NjUzIDEyOC44OTcgMzcuODgxM0MxMzEuNzgzIDM1LjA5ODUgMTM2LjI3NyAzNS4xOTIzIDEzOS4wNiAzOC4wNzgyTDE1MC45MDcgNTAuMzE1M1pNNjEuMDc1NSAxNjIuMTJDNTguMTg5NyAxNjQuOTAzIDUzLjY5NjUgMTY0LjgwOCA1MC45MTM3IDE2MS45MjJMNjEuMDc1NSAxNjIuMTJaIiBmaWxsPSIjMEYxNzJBIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTk5LjUgMTAwQzE5OS41IDQ0Ljk1MzEgMTU1LjA0NyAwLjUgMTAwIDAuNUM0NC45NTMxIDAuNSAwLjUgNDQuOTUzMSAwLjUgMTAwQzAuNSAxNTUuMDQ3IDQ0Ljk1MzEgMTk5LjUgMTAwIDE5OS41QzE1NS4wNDcgMTk5LjUgMTk5LjUgMTU1LjA0NyAxOTkuNSAxMDBaTTE3OS41IDEwMEMxNzkuNSA1Ni4wMDU3IDE0My45OTQgMjAuNSAxMDAgMjAuNUM1Ni4wMDU3IDIwLjUgMjAuNSA1Ni4wMDU3IDIwLjUgMTAwQzIwLjUgMTQzLjk5NCA1Ni4wMDU3IDE3OS41IDEwMCAxNzkuNUMxNDMuOTk0IDE3OS41IDE3OS41IDE0My45OTQgMTc5LjUgMTAwWiIgZmlsbD0iIzBGMTcyQSIvPgo8cGF0aCBkPSJNMTEwIDE4MEMxNDguNjYgMTgwIDE4MCAxNDguNjYgMTgwIDExMEMxODAgNzEuMzQwMSAxNDguNjYgNDAgMTEwIDQwQzcxLjM0MDEgNDAgNDAgNzEuMzQwMSA0MCAxMTBDNDAgMTQ4LjY2IDcxLjM0MDEgMTgwIDExMCAxODBaIiBzdHJva2U9IiMwRjE3MkEiLz4KPHBhdGggZD0iTTkwIDIwQzEyOC42NiAyMCAxNjAgNTEuMzQwMSAxNjAgOTBDMTYwIDEyOC42NiAxMjguNjYgMTYwIDkwIDE2MEM1MS4zNDAxIDE2MCAyMCAxMjguNjYgMjAgOTBDMjAgNTEuMzQwMSA1MS4zNDAxIDIwIDkwIDIwWiIgc3Ryb2tlPSIjMEYxNzJBIi8+CjwvZz4KPC9zdmc+Cg==')] opacity-50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 pb-20 md:pt-16 md:pb-28">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Transform E-Waste into</span>
            <span className="block eco-text-gradient mt-1">Sustainable Karma</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect users, kabadiwallas, and recyclers in a revolutionary ecosystem that turns electronic waste into valuable resources and rewards.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/login?tab=register">
                <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-eco-green-600 hover:bg-eco-green-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to="/how-it-works">
                <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium border-eco-green-600 text-eco-green-600 hover:bg-eco-green-50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 relative">
          <div className="relative h-64 overflow-hidden rounded-xl shadow-xl sm:h-72 md:h-80 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-eco-green-500/90 via-eco-blue-500/90 to-eco-orange-500/90 mix-blend-multiply rounded-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Join our growing network
                </h2>
                <p className="mt-2 max-w-xl text-white/90 text-sm md:text-base">
                  3000+ Users • 500+ Kabadiwallas • 50+ Recyclers
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="font-bold text-xl md:text-2xl text-white">7.5K+</div>
                    <div className="text-white/90 text-xs md:text-sm">Kg E-Waste Collected</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="font-bold text-xl md:text-2xl text-white">₹1.2M+</div>
                    <div className="text-white/90 text-xs md:text-sm">Value Generated</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="font-bold text-xl md:text-2xl text-white">15K+</div>
                    <div className="text-white/90 text-xs md:text-sm">Karma Points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
