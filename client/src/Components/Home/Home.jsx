import React, { useContext } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import "../Home/Home.scss";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { authType, setAuthType } = useContext(AuthContext);
  return (
    <div className="flex-row justify-center  w-full h-full relative">
      {(authType === "login" && <Login />) ||
        (authType === "signup" && <Signup />)}

      <h1
        style={{ color: "#2c3454" }}
        className="font-bold text-4xl text-center my-9 mb-28"
      >
        Learn ... Grow.. Conquer The World
      </h1>
      <div className="max-w-5xl  my-10  mx-auto justify-center items-center flex gap-8 ">
        <div
          style={{ boxShadow: "0 45px 45px -20px rgba(25,45,100,0.15)" }}
          className="w-3/6 rounded-xl bg-white h-full p-6 justify-center  "
        >
          <div
            style={{ backgroundColor: "#101e49" }}
            className="w-28  relative -top-10 py-1 text-white rounded-3xl justify-center items-center flex mx-auto"
          >
            Teachers
          </div>
          <div
            style={{ color: "#2c3454" }}
            className="text-center text-xl font-bold py-4"
          >
            LearnHere For Teachers
          </div>
          <div
            style={{ color: "#5d6586" }}
            className="py-4 text-center text-base "
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </div>
          <div className="flex justify-center items-center w-full">
            <Link to="/teachers/login">
              <button
                style={{ backgroundColor: "#4e9afc", width: 120 }}
                className="rounded-sm py-2 font-medium text-white"
              >
                Start Now
              </button>
            </Link>
          </div>
        </div>
        <div
          style={{ boxShadow: "0 45px 45px -20px rgba(25,45,100,0.15)" }}
          className="w-3/6 rounded-xl bg-white h-full p-6 justify-center  "
        >
          <div
            style={{ backgroundColor: "#101e49" }}
            className="w-28  relative -top-10 py-1 text-white rounded-3xl justify-center items-center flex mx-auto"
          >
            Students
          </div>
          <div
            style={{ color: "#2c3454" }}
            className="text-center text-xl font-bold py-4"
          >
            LearnHere For Students
          </div>
          <div
            style={{ color: "#5d6586" }}
            className="py-4 text-center text-base "
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </div>
          <div className="flex justify-center items-center w-full">
            <Link to="/users/login">
              <button
                style={{ backgroundColor: "#4e9afc", width: 120 }}
                className="rounded-sm py-2 font-medium text-white"
              >
                Start Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
