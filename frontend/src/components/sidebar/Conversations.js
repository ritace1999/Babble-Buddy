import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTrash } from "react-icons/fa";
import ErrorMessage from "../ErrorMessage";
import { images, stables } from "@constants";

const Conversations = ({ userData, isLoading, isError, searchKeyword }) => {
  return (
    <div className="flex flex-col gap-y-2 mx-5 rounded-lg overflow-y-auto py-5 h-[455px] px-5 bg-slate-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
      {isLoading ? (
        <span className="loading loading-dots loading-lg text-slate-900 m-auto" />
      ) : isError || !userData || userData.length === 0 ? (
        <div>
          {searchKeyword ? (
            <ErrorMessage message={`No result for "${searchKeyword}"`} />
          ) : (
            <ErrorMessage message="User not found" />
          )}
        </div>
      ) : userData ? (
        userData.map((user) => (
          <div
            key={user._id}
            className="flex flex-row items-center py-5 gap-2 rounded-lg bg-slate-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:opacity-80"
          >
            <Link
              href={"/"}
              className="flex flex-row items-center justify-start gap-3 w-full "
            >
              <div className="avatar online w-12 h-12 ml-3 ">
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
            </Link>
            <span
              className=" mx-5 rounded-lg text-white cursor-pointer bg-red-500 p-2 hover:opacity-85"
              onClick={() => alert("Deleted")}
            >
              <FaTrash />
            </span>
          </div>
        ))
      ) : (
        <ErrorMessage message={"User data not found"} />
      )}
    </div>
  );
};

export default Conversations;
