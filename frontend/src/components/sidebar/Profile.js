import { images } from "@/constants";
import Loading from "@components/loading/Loading";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Profile = ({ avatar, name, isLoading }) => {
  const imageUrl = avatar
    ? `http://localhost:4000/uploads/${avatar}`
    : images.Avatar;
  return (
    <div className="mt-4 mx-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <Link
          href="/profile"
          className="flex gap-2 justify-center items-center hover:opacity-80 "
        >
          <Image
            alt="profile"
            width={500}
            height={500}
            src={imageUrl}
            className="  rounded-full w-16 h-16 border-slate-400 border-2 object-cover "
            priority
          />
          <span className="text-white">{name}</span>
        </Link>
      )}
    </div>
  );
};

export default Profile;
