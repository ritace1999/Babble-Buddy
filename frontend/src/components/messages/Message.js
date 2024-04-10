import { images } from "@constants";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { selectedConversation } = useSelector((state) => state.conversation);
  const fromMe = userInfo?._id === message?.senderId;
  const formattedTime = new Date(message?.createdAt).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
    }
  );

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const avatar = fromMe ? userInfo?.avatar : selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? "bg-blue-500 text-white" : "";
  const imageUrl = avatar
    ? `http://localhost:4000/uploads/${avatar}`
    : images.Avatar;
  const messageRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat window
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  return (
    <div ref={messageRef} className={`chat ${chatClassName} px-10 py-2`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            width={500}
            height={500}
            alt="Profile picture"
            src={imageUrl}
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}  pb-2  `}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
