import React from "react";
import { BsSendFill } from "react-icons/bs";

const SendMessageInput = () => {
  const handleSendMessage = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex items-center  my-3 px-5 w-full  "
      onSubmit={handleSendMessage}
    >
      <input
        type="text"
        placeholder="Message..."
        className="py-[8px] text-left text-white outline-none border-none rounded-l-lg px-4 flex-grow bg-slate-300 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
      />
      <button
        type="submit"
        className="text-white text-2xl py-[8px] w-12 text-center flex items-center justify-center rounded-r-lg  bg-slate-300 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
      >
        <BsSendFill className="text-center" />
      </button>
    </form>
  );
};

export default SendMessageInput;
