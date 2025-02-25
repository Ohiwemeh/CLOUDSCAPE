import React, { useState, useEffect } from 'react';
import { logoLight } from "../assets/images";

const LoadingSpinner = () => {
  const [timeLeft, setTimeLeft] = useState(10); // Set the initial time in seconds

  useEffect(() => {
    if (timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 5000);
    }, 100000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <div className="w-40 h-40 border-emerald-200 border-2 rounded-full" />
        <div className="w-40 h-40 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0">
          <img src={logoLight} alt="" />
        </div>
        <div className="text-center text-[100px] text-white">Loading</div>
        <div className="text-center text-white text-2xl mt-4">
          Time left: {timeLeft} seconds
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;