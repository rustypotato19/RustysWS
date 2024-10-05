import React, { useState, useEffect } from "react";
import ResponsiveComponent from "./ResponsiveComponent";

// Helper function to get the day suffix (st, nd, rd, th)
const getDayWithSuffix = (day) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
};

const Header = () => {
  const [serverTime, setServerTime] = useState(
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/London",
    })
  );

  const [serverDate, setServerDate] = useState(() => {
    const date = new Date();
    const dayWithSuffix = getDayWithSuffix(date.getDate());
    const month = date.toLocaleString("en-GB", { month: "short", timeZone: "Europe/London" });
    return `${dayWithSuffix} ${month}`;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update server (London) time (HH:mm format)
      setServerTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        })
      );

      // Update server (London) date with day suffix
      const date = new Date();
      const dayWithSuffix = getDayWithSuffix(date.getDate());
      const month = date.toLocaleString("en-GB", { month: "short", timeZone: "Europe/London" });
      setServerDate(`${dayWithSuffix} ${month}`);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  return (
    <header className="bg-rws-dark-blue py-4">
      <div className="container mx-auto flex flex-col justify-center items-center text-center">
        <ResponsiveComponent />

        {/* Displaying only server date and time */}
        <div className="text-white mt-2 mb-0 relative flex flex-col items-center justify-center top-4">
          <p>Server Date-Time: {serverDate} - {serverTime}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;