import { images } from "@/constants";
import Image from "next/image";
import React from "react";

const Receiver = ({ name }) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer
     bg-slate-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 px-12 "
    >
      <p className="text-xl text-white">To:</p>
      <Image
        alt="profile"
        src={
          // ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar:
          images.Avatar
        }
        className="  rounded-full w-14  "
      />
      <span className="text-white">{name}</span>
    </div>
  );
};

export default Receiver;
