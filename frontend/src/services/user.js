import axios from "axios";

const baseURL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signInUser = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await axiosInstance.post("/signin", formData, config);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Sign in failed. Please try again later.");
    }
  }
};
export const signUpUser = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await axiosInstance.post("/signup", formData, config);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Sign in failed. Please try again later.");
    }
  }
};
