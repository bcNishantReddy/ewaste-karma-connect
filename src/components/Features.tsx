
import React from "react";
import { 
  Users, 
  Award, 
  Recycle, 
  MapPin, 
  ShoppingBag, 
  Image
} from "lucide-react";

const features = [
  {
    name: "Direct Collection",
    description:
      "Post your e-waste for collection with your preferred timing and location for nearby kabadiwallas to collect.",
    icon: MapPin,
  },
  {
    name: "Earn Karma Points",
    description:
      "Receive points and badges for every e-waste collection. Track your environmental impact in real-time.",
    icon: Award,
  },
  {
    name: "Recycled Products",
    description:
      "Browse and purchase products made from recycled materials, completing the sustainable cycle.",
    icon: ShoppingBag,
  },
  {
    name: "Verified Collection",
    description:
      "Kabadiwallas take pictures as proof of collection, ensuring transparency and accountability.",
    icon: Image,
  },
  {
    name: "Recyclng Network",
    description:
      "Large-scale recyclers connect directly with kabadiwallas for industrial-level recycling partnerships.",
    icon: Recycle,
  },
  {
    name: "Community Impact",
    description:
      "Join a growing community of environmentally conscious individuals and businesses making a difference.",
    icon: Users,
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-white overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to manage e-waste
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Our platform creates a sustainable ecosystem connecting all stakeholders
            in the e-waste management chain
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Connecting waste generators with collectors
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Our platform bridges the gap between users with e-waste and the kabadiwallas who collect it,
              creating an efficient and rewarding process for everyone involved.
            </p>

            <dl className="mt-10 space-y-10">
              {features.slice(0, 3).map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-eco-green-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0">
            <div className="relative rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-80 bg-eco-blue-600 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Our Impact So Far</h3>
                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <div className="text-4xl font-bold">7,500+</div>
                        <div className="text-sm opacity-90">Kg of E-Waste Collected</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold">500+</div>
                        <div className="text-sm opacity-90">Kabadiwallas</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold">3,000+</div>
                        <div className="text-sm opacity-90">Users</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold">50+</div>
                        <div className="text-sm opacity-90">Recyclers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Empowering kabadiwallas and recyclers
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                We provide kabadiwallas with technology to modernize their operations and connect directly with large-scale recyclers
                for better economic opportunities.
              </p>

              <dl className="mt-10 space-y-10">
                {features.slice(3, 6).map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-eco-orange-500 text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <div className="relative rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-80 bg-eco-green-600 rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-8 text-center text-white">
                      <h3 className="text-2xl font-bold mb-4">Sustainable Future</h3>
                      <p className="text-base opacity-90 mb-6">
                        By connecting all stakeholders in the e-waste ecosystem, we're creating a self-sustaining cycle of growth
                        that benefits everyone while protecting our environment.
                      </p>
                      <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-eco-green-700 bg-white hover:bg-gray-50">
                        Join the movement
                      </div>
                    </div>
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

export default Features;
