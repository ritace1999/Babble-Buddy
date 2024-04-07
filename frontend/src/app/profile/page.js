"use client";
import Button from "@/components/button/Button";
import React, { useState } from "react";
import { CiMail, CiUser } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import AvatarComponent from "@/components/profile/AvatarComponent";
import GenderCheckbox from "@/components/GenderCheckBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "@/services/user";
import ErrorMessage from "@/components/ErrorMessage";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userActions } from "@store/reducers/userReducer";
import ChangePassword from "@components/ChangePassword";

const page = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    userName: "",
    oldPassword: "",
    newPassword: "",
    gender: "",
  });

  const {
    data: profileData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getUserProfile({ token: userInfo.token }),
    queryKey: ["profile"],
    onSuccess: (data) => {
      setInputs({
        fullName: data.fullName || "",
        email: data.email || "",
        userName: data.userName || "",
        gender: data.gender || "",
      });
    },
  });

  const { mutate: mutateUpdate, isLoading: LoadingUpdate } = useMutation({
    mutationFn: ({ fullName, userName, gender, token }) => {
      return updateUserProfile({
        token,
        formData: { fullName, userName, gender },
      });
    },
    onSuccess: (data) => {
      const existingData = JSON.parse(localStorage.getItem("account")) || {};
      const updatedData = { ...existingData, ...data };
      localStorage.setItem("account", JSON.stringify(updatedData));
      dispatch(userActions.setUserInfo(updatedData));
      toast.success(data.message);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const { fullName, userName, gender } = inputs;
    mutateUpdate({ fullName, userName, gender, token: userInfo.token });
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleChangePasswordDialog = () => {
    setChangePasswordDialog(true);
  };

  const handlePasswordChange = () => {
    console.log("password changed");
  };

  return (
    <div className="h-screen m-auto flex ">
      <div className=" flex  m-auto w-[50%] h-[90%] bg-slate-500 rounded-md shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        <div
          className="bg-slate-500 rounded-full h-6 w-6 flex items-center justify-center m-5 cursor-pointer bg-opacity-30 hover:opacity-85 "
          onClick={() => router.push("/")}
        >
          <BiArrowBack className="" />
        </div>
        {isLoading ? (
          <span className="loading loading-dots loading-lg text-slate-900 m-auto" />
        ) : isError ? (
          <span className="flex m-auto">
            <ErrorMessage message={"Error fetching user profile."} />
          </span>
        ) : (
          <div className="flex flex-col mx-auto my-5">
            <div className="flex mx-auto gap-2 justify-center items-center  ">
              <AvatarComponent avatar={profileData?.avatar} refetch={refetch} />
            </div>
            <form
              className="flex flex-col w-full gap-y-[27px] justify-center items-center  my-[30px]"
              onSubmit={updateProfileHandler}
            >
              <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
                <input
                  type="text"
                  onChange={(e) =>
                    setInputs({ ...inputs, fullName: e.target.value })
                  }
                  value={inputs.fullName}
                  placeholder="Full Name "
                  className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
                />
                <CiUser className="bg-white text-slate-800 mr-2 text-2xl" />
              </div>
              <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
                <input
                  onChange={(e) =>
                    setInputs({ ...inputs, userName: e.target.value })
                  }
                  value={inputs.userName}
                  type="text"
                  placeholder="User Name"
                  className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
                />
                <MdAlternateEmail className="bg-white text-slate-800 mr-2 text-2xl " />
              </div>
              <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
                <input
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                  value={inputs.email}
                  disabled
                  type="text"
                  placeholder="Email"
                  className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
                />
                <CiMail className="bg-white text-slate-800 mr-2 text-2xl " />
              </div>

              <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
                <input
                  value={"Change Password"}
                  disabled
                  type={"text"}
                  className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
                />
                <FaEdit
                  className="bg-white text-green-500 mr-2 text-2xl cursor-pointer hover:opacity-85"
                  onClick={handleChangePasswordDialog}
                />
              </div>
              {changePasswordDialog && (
                <ChangePassword
                  onCancel={() => setChangePasswordDialog(false)}
                  setChangePasswordDialog={setChangePasswordDialog}
                />
              )}
              <div className="mr-20">
                <GenderCheckbox
                  onCheckboxChange={handleCheckboxChange}
                  selectedGender={inputs.gender}
                />
              </div>

              <Button type="submit">
                {LoadingUpdate ? "Updating..." : "Update"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
