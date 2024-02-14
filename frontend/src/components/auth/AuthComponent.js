import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen container">
      <div className="m-auto bg-slate-500 rounded-md w-[80%] h-4/5 grid lg:w-[35%] shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
        <div className="text-center py-6 ">{children}</div>
      </div>
    </div>
  );
}
