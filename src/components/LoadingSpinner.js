import React from 'react';
import { Ring } from '@uiball/loaders';

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center h-full relative bottom-7">
      <Ring
        size={58}            // Size of the ring
        speed={2}            // Speed of the animation
        strokeWidth={6}      // Width of the stroke
        color="blue"        // Color of the ring
      />
    </div>
  );
};

export default LoaderComponent;
