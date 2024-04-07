import { logout } from "@/store/actions/user";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/signin");
    toast.success("Sign out successful.");
  };
  return (
    <div className=" my-3 px-5 w-full hover:opacity-90 text-xl ">
      <button
        onClick={logoutHandler}
        className="w-full flex items-center justify-center  gap-5 py-[8px] text-center text-white outline-none border-none rounded-lg  flex-grow bg-slate-300 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
      >
        Sign Out
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default Logout;
