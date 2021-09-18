import React from "react";
import { Link } from "react-router-dom";

function TeacherSignup() {
  return (
    <div className=" flex items-center justify-center w-full h-full">
      <div className="w-80 bg-white  justify-center items-center p-5 ">
        <div style={{ color: "#46535e" }} className="font-bold text-base  mb-5">
          Signup as a teacher
        </div>
        <form className="w-full flex-col items-center  justify-center ">
          <input
            type="text"
            name="name"
            placeholder="name"
            className="rounded border w-full p-2 mb-4"
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="rounded border w-full p-2 mb-4"
          />
          <div className="grid grid-cols-2 gap-1">
            <input
              type="text"
              name="job"
              placeholder="job"
              className="rounded border w-full p-2 mb-4"
            />
            <input
              type="text"
              name="company"
              placeholder="company
            "
              className="rounded border w-full p-2 mb-4"
            />
          </div>
          <input
            type="text"
            name="skills"
            aria-multiline
            placeholder="skills"
            className="rounded border w-full p-2 mb-4"
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            className="rounded border w-full p-2 mb-4"
          />
          <input
            name="confirm-password"
            placeholder="Retype password"
            type="password"
            className="rounded border w-full p-2 mb-4"
          />
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
              Already have an account?
            </div>
            <span>
              <Link
                style={{ color: "#4c9cdf" }}
                to="/teachers/login"
                className="text-sm"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignup;
