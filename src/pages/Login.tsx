
import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Recycle } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="text-eco-green-600 hover:text-eco-green-700 font-medium flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
            <Link to="/" className="flex items-center space-x-2">
              <Recycle className="h-6 w-6 text-eco-green-600" />
              <span className="text-xl font-bold text-eco-green-600">E-Karma</span>
            </Link>
          </div>
          
          <AuthForm />
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4373 21.879V14.89H7.89831V12H10.4373V9.797C10.4373 7.291 11.9313 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5633 9.333 13.5633 10.124V12H16.3363L15.8933 14.89H13.5633V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z"></path>
                </svg>
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.3538 10.1684H12.0845V13.5264H17.3601C17.0879 16.0953 14.7031 17.0172 12.1123 17.0172C8.79667 17.0172 6.0043 14.5332 6.0043 11.2077C6.0043 7.9799 8.6291 5.39854 12.1412 5.39854C14.7589 5.39854 16.3601 6.91226 16.3601 6.91226L18.6334 4.58332C18.6334 4.58332 16.3322 2 12.0567 2C6.72548 2 2.33447 6.52669 2.33447 11.1808C2.33447 15.7506 6.46655 20.3616 12.1988 20.3616C17.3869 20.3616 21.221 17.0173 21.221 11.4514C21.221 10.6284 21.3538 10.1684 21.3538 10.1684Z"></path>
                </svg>
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18937 16.6159 8.0196 16.6491C6.53999 17.8118 4.70517 18.4426 2.82373 18.4399C2.49214 18.4396 2.16128 18.4205 1.83252 18.3828C3.70243 19.6102 5.96821 20.2625 8.28833 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-4 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} E-Waste Karma Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
