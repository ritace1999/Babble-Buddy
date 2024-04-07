import { images } from "@/constants";
import Image from "next/image";
import "animate.css/animate.min.css";

import React, { useEffect, useState } from "react";

const Welcome = ({ avatar, name }) => {
  const imageUrl = avatar
    ? `http://localhost:4000/uploads/${avatar}`
    : images.Avatar;
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  return (
    <div className="  w-full h-full p-10   ">
      <div className=" flex flex-col items-center justify-center rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl  h-full w-full animate__animated animate__fadeIn">
        <Image
          alt="profile"
          width={500}
          height={500}
          style={{ width: "350px", height: "350px" }}
          src={imageUrl}
          className="aspect-square rounded-lg border-2 border-slate-100 object-cover animate__animated animate__slideInRight"
          loading="eager"
          priority
        />

        <h2 className="text-4xl font-bold text-white animate__animated animate__slideInDown mb-2">
          Welcome, <span className=" text-4xl mx-2">{name}👋 !</span>
        </h2>
        <p className="text-2xl font-bold text-white animate__animated animate__slideInRight my-2">
          Select a chat to start messaging ✉️
        </p>
        <p className="text-2xl font-bold text-white animate__animated animate__slideInUp my-2">
          Today is {currentMonth} {currentDay}, {currentYear}
        </p>
        <p className="text-2xl font-bold text-white animate__animated animate__slideInLeft my-2">
          Time: {currentTime}
        </p>
      </div>
    </div>
  );
};

export default Welcome;
