import React from "react";

const Button = ({ children, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=" bg-black text-white w-[250px] rounded-lg py-2 md:py-3 px-5 md:w-[340px] hover:opacity-75"
    >
      {children}
    </button>
  );
};

export default Button;
