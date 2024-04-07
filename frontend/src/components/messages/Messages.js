import React from "react";
import Message from "./Message";
import Image from "next/image";
import { images } from "@/constants";
import { useSelector } from "react-redux";

const Messages = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="h-[80%]  ">
      <div className="mx-5 rounded-lg mt-3 overflow-y-auto h-full py-2 bg-slate-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  );
};

export default Messages;
