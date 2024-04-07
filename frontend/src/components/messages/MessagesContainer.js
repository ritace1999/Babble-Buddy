import React from "react";
import Receiver from "./Receiver";
import SendMessageInput from "./SendMessageInput";
import Messages from "./Messages";
import Welcome from "./Welcome";

const MessagesContainer = ({ avatar, name, isLoading }) => {
  const noChatSelected = true;

  return (
    <>
      {isLoading ? (
        <span className="loading loading-dots loading-lg text-slate-900 m-auto bg-slate-50" />
      ) : (
        <div className=" w-full h-full">
          {noChatSelected ? (
            <Welcome avatar={avatar} name={name} />
          ) : (
            <>
              <Receiver />
              <Messages />
              <SendMessageInput />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MessagesContainer;
