import React, { useState } from "react";
import FormModal from "./FormModal"; // Import the modal component

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="bg-rws-light-blue text-white text-center pt-10">
      <div className="container mx-auto pb-4">
        <h2 className="text-3xl font-bold mb-6">Your Partner in All Developments</h2>
        <p className="text-lg mx-auto mb-6 w-[80%] md:w-full">
          I specialise in building modern, responsive, and high-performance websites. Whether you're looking for a simple landing page or a complex web application, I can help   bring your ideas to life through hard work and dedication
        </p>
        <button
          onClick={openModal} // Open the modal on click
          className="bg-red-600 text-white hover:text-red-600 py-2 px-6 rounded-lg hover:bg-gray-900 cursor-pointer duration-300 border-2 border-gray-900 hover:border-red-600"
        >
          Request Service
        </button>
      </div>
      {/* Render the modal and pass the open/close state */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
      <div className="flex justify-center items-center mt-4 bg-rws-dark-blue">
        <div className="flex flex-row justify-between items-center text-sm w-full mx-20 xl:w-1/2">
          <div className="p-4 rounded-lg text-center">
            <h3 className="text-base font-bold">Need more information?</h3>
            <p>Contact me for information, or just more directly by emailing:</p>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-2">
              <a
                href="mailto:
                info@rustyws.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rws-dark-blue mx-2 transition-all duration-500 hover:scale-105 hover:text-blue-600 bg-slate-100 py-1 px-2 rounded-lg hover:bg-blue-100"
              >info@rustyws.com</a>
              <a
                href="mailto:
                contact@rustyws.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rws-dark-blue mx-2 transition-all duration-500 hover:scale-105 hover:text-blue-600 bg-slate-100 py-1 px-2 rounded-lg hover:bg-blue-100"
              >contact@rustyws.com</a>
            </div>
          </div>
          <div className="p-4 rounded-lg text-center">
            <h3 className="text-base font-bold">Already Made a Request?</h3>
            <p>View your request and it's status here:</p>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center mt-2">
              <a
                  href="/view-ticket"
                  rel="noopener noreferrer"
                  className="text-rws-dark-blue mx-2 transition-all duration-500 hover:scale-105 hover:text-blue-600 bg-slate-100 py-1 px-2 rounded-lg hover:bg-blue-100"
                >View Tickets</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
