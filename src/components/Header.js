import React, { useState, useEffect } from "react";

const Header = () => {
  const [localTime, setLocalTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [londonTime, setLondonTime] = useState(
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/London",
    })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update user's local time (HH:mm format)
      setLocalTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );

      // Update London (server) time (HH:mm format)
      setLondonTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        })
      );
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  return (
    <header className="bg-rws-dark-blue py-4">
      <div className="container mx-auto flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-4xl font-bold flex justify-center items-center">
          <a href="/">
            <img
              src="/images/logos/home.svg"
              alt="Home"
              className="w-10 h-auto mr-3"
            />
          </a>
          Rusty's Web Services
        </h1>

        {/* Displaying both times (HH:mm format) */}
        <div className="text-white mt-2 mb-0 relative flex flex-row items-center justify-center top-4">
          <p>Local Time: {localTime}</p>
          <p className="mx-3">|</p>
          <p>Server Time: {londonTime}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
