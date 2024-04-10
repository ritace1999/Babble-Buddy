import React from "react";
import Message from "./Message";

import MessageSkeleton from "@components/skeletons/MessageSkeleton";

const Messages = ({ isLoading, data }) => {
  return (
    <div className="h-[80%]  ">
      <div className="mx-5 rounded-lg mt-3 overflow-y-auto h-full py-2 bg-slate-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        {!isLoading &&
          data?.length > 0 &&
          data?.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        {isLoading && <MessageSkeleton />}
        {!isLoading && (!data || data.length === 0) && (
          <p className="flex justify-center items-center text-white">
            Send a message to start conversation
          </p>
        )}
      </div>
    </div>
  );
};

export default Messages;
