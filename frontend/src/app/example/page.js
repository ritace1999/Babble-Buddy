// ExampleComponent.js
"use client";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

const page = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  // Get user data from the store
  console.log(userState.userInfo);

  // Log user data to the console
  console.log("User data:", user);

  return <div>{user.name}</div>;
};

export default page;
