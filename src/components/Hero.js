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
    <section className="bg-rws-light-blue text-white text-center py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Your Partner in All Developments</h2>
        <p className="text-lg max-w-3xl mx-auto mb-6">
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
    </section>
  );
};

export default Hero;
