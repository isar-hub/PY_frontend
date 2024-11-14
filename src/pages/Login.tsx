import { useState } from "react";
import { Link } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducers/userReducer";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import signInImage from "../assets/Adult toy store.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSignUpMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import logo from "../assets/Pleasureyourself-adult-toy-store.png";

export function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleEmailPasswordSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log("Signed in user:", user);

      const res = await login({
        email: user.email!,
        name: user.displayName!,
        photo: user.photoURL!,
        gender: "",
        dob: "",
        _id: user.uid,
        role: "user",
      });

      if ("data" in res && res.data) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        if (data?.user) {
          dispatch(userExist(data.user));
        } else {
          dispatch(userNotExist());
        }
      } else if (res.error) {
        const error = res.error as FetchBaseQueryError;
        const message =
          (error.data as MessageResponse)?.message || "Unknown error occurred";
        toast.error(message);
        dispatch(userNotExist());
      } else {
        toast.error("Unexpected error occurred");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(`Sign In Failed: ${err.message}`);
      console.error("Sign in Error: ", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        email: user.email || "",
        name: user.displayName || "",
        photo: user.photoURL || "",
        // gender: "other",
        dob: "",
        _id: user.uid,
        role: "user",
        // password: "",
      });

      if (res && res.data) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        const error = res as FetchBaseQueryError;
        const message =
          (error.data as { message?: string })?.message ||
          "Unknown error occurred";

        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign In Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div
        className="hidden md:block md:w-7/12 bg-cover bg-center"
        style={{ backgroundImage: `url(${signInImage})` }}
      ></div>
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <img src={logo} className="w-40 mb-10" />
            <h2 className="text-3xl font-extrabold text-gray-900">Sign in</h2>
          </div>
          <form
            className="m-2 space-y-5 md:mt-8 md:space-y-6"
            onSubmit={handleEmailPasswordSignIn}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-2">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FcGoogle className="mr-2" />
                Sign in with Google
              </button>
            </div>
          </form>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <span className="block text-sm text-center text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SignUp() {
  const [signUp] = useSignUpMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const res = await signUp({
        name: `${formData.firstName} ${formData.lastName}`,
        email: user.email || "",
        password: formData.password,
        mobile: formData.mobile,
        _id: user.uid,
      });

      if (res && res.data) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        const error = res as FetchBaseQueryError;
        const message =
          (error.data as { message?: string })?.message ||
          "Unknown error occurred";

        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign Up Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign Up</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex flex-col sm:flex-row md:space-x-4">
                <div className="py-2 basis=1/2">
                  <label htmlFor="firstName" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>
                <div className="py-2 basis-1/2">
                  <label htmlFor="lastName" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="py-2">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                />
              </div>
              <div className="py-2">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="py-2">
                <label htmlFor="mobile" className="sr-only">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="text"
                  autoComplete="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mobile Number (optional)"
                />
              </div>
              <div className="py-2">
                <label className="flex items-center">
                  <input
                    id="allowExtraEmails"
                    name="allowExtraEmails"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I want to receive inspiration, marketing promotions, and
                    updates via email.
                  </span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <span className="block text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
