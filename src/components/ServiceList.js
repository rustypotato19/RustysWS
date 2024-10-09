import React from "react";

// Example services data
/* const services = [
  { title: "Web Development", description: "Custom websites built with the latest technologies to meet your business needs." },
  { title: "Plugin Development", description: "Developing plugins for platforms like Discord or Minecraft." },
  { title: "Responsive Design", description: "Ensuring seamless experiences across all devices." }
]; */

const ServiceList = () => {
  return (
    <section id="services" className="py-12 bg-gray-100 cursor-default">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-4">
          
          {/* Web Development */}
          <div className="bg-white p-6 rounded-lg shadow-md transform transition-transition-shadow duration-500 hover:scale-105 hover:shadow-lg hover:shadow-rws-dark-blue">
            <h3 className="text-2xl text-blue-700 font-semibold mb-4">Web Development</h3>
            <p className="text-gray-700">Custom websites built with the latest technologies to meet your personal and business needs.</p>
          </div>
          
          {/* Plugin Development */}
          <div className="bg-white p-6 rounded-lg shadow-md transform transition-transition-shadow duration-500 hover:scale-105 hover:shadow-xl hover:shadow-rws-dark-blue">
            <h3 className="text-2xl text-blue-700 font-semibold mb-4">Plugin Development</h3>
            <p className="text-gray-700">Developing plugins for platforms like Discord or Minecraft.</p>
          </div>
          
          {/* Responsive Design */}
          <div className="bg-white p-6 rounded-lg shadow-md transform transition-transition-shadow duration-500 hover:scale-105 hover:shadow-xl hover:shadow-rws-dark-blue">
            <h3 className="text-2xl text-blue-700 font-semibold mb-4">Responsive Design</h3>
            <p className="text-gray-700">Ensuring seamless experiences across all devices.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceList;
