import React, { useEffect } from "react";
import Receiver from "./Receiver";
import SendMessageInput from "./SendMessageInput";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getMessage } from "@services/user";
import Messages from "./Messages";
import Welcome from "./Welcome";
import {
  setSelectedConversation,
  setMessages,
} from "@store/reducers/conversationReducer";
import Loading from "@components/loading/Loading";

const MessagesContainer = ({ avatar, name, isLoading }) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { selectedConversation, messages } = useSelector(
    (state) => state.conversation
  );
  useEffect(() => {
    return () => {
      dispatch(setSelectedConversation(null));
    };
  }, [setSelectedConversation]);

  const {
    data,
    isLoading: messageIsloading,
    isError,
    refetch,
  } = useQuery(["messages", selectedConversation?._id], () =>
    getMessage({ token: userInfo?.token, userId: selectedConversation?._id })
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" w-full h-full">
          {!selectedConversation ? (
            <Welcome avatar={avatar} name={name} />
          ) : (
            <>
              <Receiver name={selectedConversation?.fullName} />
              <Messages data={data} isLoading={messageIsloading} />
              <SendMessageInput
                refetch={refetch}
                messages={messages}
                selectedConversation={selectedConversation}
                setMessages={setMessages}
                setSelectedConversation={setSelectedConversation}
                dispatch={dispatch}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MessagesContainer;
