"use client";
import Layout from "@/components/auth/AuthComponent";
import { IoFingerPrint } from "react-icons/io5";
import React, { useState } from "react";
import Button from "@/components/button/Button";
import Link from "next/link";
import { MdAlternateEmail } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "@/services/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signInValidation } from "@/utils/authValidation";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/reducers/userReducer";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ identifier: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(
    (formData) => signInUser(formData),
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        localStorage.setItem("account", JSON.stringify(data));
        dispatch(userActions.setUserInfo(data));
        toast.success("Sign in successful.");
        router.push("/");
      },
    }
  );

  const signInSubmitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = signInValidation(inputs);

    if (Object.keys(validationErrors).length > 0) {
      const errorMessage = Object.values(validationErrors)[0];
      toast.error(errorMessage);
      return;
    }
    await mutate(inputs);
  };

  return (
    <Layout>
      <h1 className="font-extrabold text-white text-2xl">Sign In</h1>
      <form
        className="flex flex-col w-full gap-y-6 justify-center items-center my-10"
        onSubmit={signInSubmitHandler}
      >
        <div className="flex flex-row rounded-lg justify-center items-center bg-white ">
          <input
            type="text"
            onChange={(e) =>
              setInputs({ ...inputs, identifier: e.target.value })
            }
            value={inputs.identifier}
            placeholder="Email / Username"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <MdAlternateEmail className="bg-white text-slate-800 mr-2 text-2xl" />
        </div>
        <div className="flex flex-row rounded-lg justify-center items-center bg-white ">
          <input
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            value={inputs.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border-none outline-none bg-white rounded-lg text-slate-800 py-2 px-5 md:w-[300px]"
          />
          <IoFingerPrint
            className="bg-white text-slate-800 mr-2 text-2xl cursor-pointer hover:opacity-85"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
        <p className="text-white">
          Do not have an account?{" "}
          <span className="text-blue-500 cursor-pointer">
            <Link href="/signup">Sign Up</Link>
          </span>
        </p>
      </form>
    </Layout>
  );
};

export default SignInPage;
