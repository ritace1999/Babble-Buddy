import React, { useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@services/user";
import { useSelector } from "react-redux";

const SendMessageInput = ({ selectedConversation, refetch }) => {
  const [inputs, setInputs] = useState({ message: "" });
  const { userInfo } = useSelector((state) => state.user);
  const { mutate, isLoading } = useMutation(
    ({ token, message, userId }) => sendMessage({ token, message, userId }),
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        refetch();
        setInputs({ message: "" });
      },
    }
  );
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputs.message.trim()) {
      return;
    }
    mutate({
      token: userInfo?.token,
      userId: selectedConversation?._id,
      message: inputs,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  return (
    <form
      className="flex items-center  my-3 px-5 w-full  "
      onSubmit={handleSendMessage}
    >
      <input
        type="text"
        placeholder="Message..."
        name="message"
        onChange={handleInputChange}
        value={inputs.message}
        className="py-[8px] text-left text-white outline-none border-none rounded-l-lg px-4 flex-grow bg-slate-300 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="text-white text-2xl py-[8px] w-12 h-[40px] text-center flex items-center justify-center rounded-r-lg  bg-slate-300 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-md text-slate-100 m-auto" />
        ) : inputs.message.length >= 1 ? (
          <BsSendFill className="text-center" />
        ) : (
          ""
        )}
      </button>
    </form>
  );
};

export default SendMessageInput;
