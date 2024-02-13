"use client";
import Layout from "@/components/auth/AuthComponent";
import { IoFingerPrint } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";

import { CiUser } from "react-icons/ci";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";

import Button from "@/components/button/Button";
import Link from "next/link";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const loginSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <h1 className=" text-white font-extrabold text-2xl">Sign Up</h1>
      <form
        className="flex flex-col w-full gap-y-[27px] justify-center items-center my-8 "
        onSubmit={loginSubmitHandler}
      >
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            placeholder="Full Name "
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <CiUser className="bg-white text-slate-800 mr-2 text-2xl" />
        </div>
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="User Name"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <MdAlternateEmail className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer" />
        </div>
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Email"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <CiMail className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer" />
        </div>
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border-none  bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <IoFingerPrint
            className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <IoFingerPrint
            className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <Button type="submit">Sign Up</Button>
        <p>
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer">
            <Link href="/signin">Sign In</Link>
          </span>
        </p>
      </form>
    </Layout>
  );
};

export default page;
