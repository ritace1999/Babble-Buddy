"use client";
import Sidebar from "@components/sidebar/Sidebar";
import MessagesContainer from "@components/messages/MessagesContainer";
import { getUserProfile } from "@services/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { userInfo } = useSelector((state) => state.user);
  const router = useRouter();
  const {
    data: profileData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getUserProfile({ token: userInfo.token }),
    queryKey: ["profile"],
    enabled: !!userInfo,
  });
  useEffect(() => {
    if (!userInfo) {
      router.push("/signin");
    }
  }, [userInfo, router]);

  return (
    <div className="p-4 h-screen flex items-center justify-center ">
      <div className="flex w-16 lg:w-[34%] h-full rounded-lg overflow-hidden bg-gray-500 mr-4  flex-wrap shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
        <Sidebar avatar={profileData?.avatar} name={profileData?.fullName} />
      </div>
      <div className="flex w-full h-full rounded-lg overflow-hidden bg-gray-500 flex-wrap shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        <MessagesContainer
          avatar={profileData?.avatar}
          name={profileData?.fullName}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default page;
