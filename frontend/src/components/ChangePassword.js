import { updatePasswordValidation } from "@utils/authValidation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IoFingerPrint } from "react-icons/io5";
import { updateUserPassword } from "@services/user";

const ChangePassword = ({ onCancel, setChangePasswordDialog }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { mutate: mutateUpdate, isLoading: loadingUpdate } = useMutation({
    mutationFn: ({ formData, token }) => {
      return updateUserPassword({
        token,
        formData,
      });
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setChangePasswordDialog(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChangePassword = () => {
    const validationErrors = updatePasswordValidation(inputs);
    if (Object.keys(validationErrors).length > 0) {
      const errorMessage = Object.values(validationErrors)[0];
      toast.error(errorMessage);
      return;
    }
    const { confirmPassword, ...formData } = inputs;
    mutateUpdate({ formData, token: userInfo.token });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  ">
      <div
        className="fixed inset-0 bg-slate-900 backdrop-filter backdrop-blur-xl bg-opacity-85"
        onClick={onCancel}
      ></div>
      <div className="relative bg-slate-200 p-8 rounded-md text-center shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        <h1 className="text-black text-xl mb-2">Change Password</h1>
        <div className="flex gap-5 flex-col my-5">
          <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
            <input
              onChange={(e) =>
                setInputs({ ...inputs, oldPassword: e.target.value })
              }
              value={inputs.oldPassword}
              type={showPassword.oldPassword ? "text" : "password"}
              placeholder="Old Password"
              className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
            />
            <IoFingerPrint
              className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer hover:opacity-85"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  oldPassword: !showPassword.oldPassword,
                })
              }
            />
          </div>
          <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
            <input
              onChange={(e) =>
                setInputs({ ...inputs, newPassword: e.target.value })
              }
              value={inputs.newPassword}
              type={showPassword.newPassword ? "text" : "password"}
              placeholder="New Password"
              className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
            />
            <IoFingerPrint
              className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer hover:opacity-85"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  newPassword: !showPassword.newPassword,
                })
              }
            />
          </div>
          <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
            <input
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              value={inputs.confirmPassword}
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
            />
            <IoFingerPrint
              className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer hover:opacity-85"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirmPassword: !showPassword.confirmPassword,
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-center items-center space-x-6">
          <button
            onClick={onCancel}
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-white focus:z-10"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            type="button"
            className="py-2 px-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            {loadingUpdate ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
