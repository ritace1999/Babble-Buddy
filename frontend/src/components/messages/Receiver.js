import { images } from "@/constants";
import Image from "next/image";
import React from "react";

const Receiver = ({ name, avatar }) => {
  const imageUrl = avatar
    ? `http://localhost:4000/uploads/${avatar}`
    : images.Avatar;
  return (
    <div
      className="flex items-center gap-2 cursor-pointer
     bg-slate-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 px-12 h-14 "
    >
      <p className="text-xl text-white">To:</p>
      <Image
        alt="profile"
        src={imageUrl}
        width={300}
        height={300}
        className="  rounded-full w-12  "
      />
      <span className="text-white">{name}</span>
    </div>
  );
};

export default Receiver;
