"use client";
import Layout from "@/components/auth/AuthComponent";
import { IoFingerPrint } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import Button from "@/components/button/Button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/services/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUpValidation } from "@/utils/authValidation";
import GenderCheckbox from "@components/GenderCheckBox";

const page = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    (formData) => signUpUser(formData),
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        toast.success("Register successful");
        router.push("/signin");
      },
    }
  );
  const signUpSubmitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = signUpValidation(inputs);

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      // If there are errors, display the first error encountered
      const errorMessage = Object.values(validationErrors)[0]; // Get the first error message
      toast.error(errorMessage);
      return;
    }

    const { confirmPassword, ...formData } = inputs;
    mutate(formData);
  };
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };
  return (
    <Layout>
      <h1 className=" text-white font-extrabold text-2xl">Sign Up</h1>
      <form
        className="flex flex-col w-full gap-y-[22px] justify-center items-center my-8 "
        onSubmit={signUpSubmitHandler}
      >
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            type="text"
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            value={inputs.fullName}
            placeholder="Full Name "
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <CiUser className="bg-white text-slate-800 mr-2 text-2xl" />
        </div>
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
            value={inputs.userName}
            type="text"
            placeholder="User Name"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <MdAlternateEmail className="bg-white text-slate-800 mr-2 text-2xl " />
        </div>
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            value={inputs.email}
            type="text"
            placeholder="Email"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <CiMail className="bg-white text-slate-800 mr-2 text-2xl " />
        </div>
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            value={inputs.password}
            type={showPassword.password ? "text" : "password"}
            placeholder="Password"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <IoFingerPrint
            className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer hover:opacity-85"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                password: !showPassword.password,
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
            placeholder="Password"
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
        <div className="mr-20">
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      <div className="mt-[-20px]">
        <p className="text-white">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer ">
            <Link href="/signin">Sign In</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default page;
