import React from "react";
import { Link } from "react-router-dom";

function TeacherLogin() {
  return (
    <div className=" flex items-center justify-center w-full h-full">
      <div className="w-80 bg-white  justify-center items-center p-5 ">
        <div style={{ color: "#46535e" }} className="font-bold text-base  mb-5">
          Login as a teacher
        </div>
        <form className="w-full flex-col items-center  justify-center ">
          <input
            type="text"
            name="email"
            placeholder="email"
            className="rounded border w-full p-2 mb-4"
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            className="rounded border w-full p-2 mb-2"
          />
          <Link
            to="/"
            style={{ color: "#4c9cdf" }}
            className="text-sm my-2  w-full justify-end flex"
          >
            forgot password?
          </Link>
          <div className="flex justify-center items-center w-full">
            <Link>
              <button
                style={{ backgroundColor: "#33adff" }}
                className="w-52 mx-auto p-2 font-bold text-white rounded-sm"
              >
                Login
              </button>
            </Link>
          </div>
          <div className="flex w-full justify-center my-4">
            <div style={{ color: "#46535e" }} className="text-sm">
              Don't have an account?
            </div>
            <span>
              <Link
                style={{ color: "#4c9cdf" }}
                to="/teachers/signup"
                className="text-sm"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
