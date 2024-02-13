"use client";
import Layout from "@/components/auth/AuthComponent";
import { IoFingerPrint } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import React, { useState } from "react";
import Button from "@/components/button/Button";
import Link from "next/link";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <h1 className=" font-extrabold text-2xl">Sign In</h1>
      <form
        className="flex flex-col w-full gap-y-6 justify-center items-center my-10"
        onSubmit={loginSubmitHandler}
      >
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email / Username "
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <CiUser className="bg-white text-slate-800 mr-2 text-2xl" />
        </div>
        <div className="flex flex-row  rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <IoFingerPrint
            className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="flex flex-row  gap-x-2 mr-[120px] md:mr-[200px] ">
          <input
            type="checkbox"
            className="border-none outline-none bg-white rounded-lg text-slate-800 w-4  "
          />
          <p>Remember Me</p>
        </div>

        <Button type="submit">Sign In</Button>
        <p>
          Do not have an account?{" "}
          <span className="text-blue-500 cursor-pointer">
            <Link href="/signup">Sign Up</Link>
          </span>
        </p>
      </form>
    </Layout>
  );
};

export default page;
