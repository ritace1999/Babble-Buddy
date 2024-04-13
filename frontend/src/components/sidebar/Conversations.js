import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import ErrorMessage from "../Error/Error";
import { images, stables } from "@constants";
import { setSelectedConversation } from "@store/reducers/conversationReducer";
import { useSocketContext } from "@context/socketContext";

const Conversations = ({ user, isError, searchKeyword }) => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const isSelectedConversation = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers?.includes(user?._id);
  const dispatch = useDispatch();
  const handleSelectConversation = () => {
    dispatch(setSelectedConversation(user));
  };
  return (
    <div>
      {isError || !user || user.length === 0 ? (
        <div>
          {searchKeyword ? (
            <ErrorMessage message={`No result for "${searchKeyword}"`} />
          ) : (
            <ErrorMessage message="User not found" />
          )}
        </div>
      ) : (
        <div
          onClick={handleSelectConversation}
          key={user._id}
          className={`flex cursor-pointer flex-row items-center py-5 gap-2 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ${
            isSelectedConversation ? "bg-sky-600" : "bg-slate-400"
          }`}
        >
          <div className="flex flex-row items-center justify-start gap-3 w-full ">
            <div
              className={`avatar w-12 h-12 ml-3 ${isOnline ? "online" : ""}`}
            >
              <Image
                src={
                  user.avatar
                    ? stables.UPLOAD_FOLDER_BASE_URL + user.avatar
                    : images.Avatar
                }
                alt="profile"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <div>
              <span className="text-white">{user.fullName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversations;
