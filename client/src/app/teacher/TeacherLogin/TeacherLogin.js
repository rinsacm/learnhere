import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthRoleContext } from "../../../contexts/AuthRoleContext";

function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { role, setRole } = useContext(AuthRoleContext);
  let history = useHistory();
  const onLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/teacher/login", {
      method: "POST",
      credentials: "include",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
        // localStorage.setItem("token", `Bearer ${data.token}`);
        // localStorage.setItem("user_id", data.user.email);})
      })
      .then((data) => {
        console.log(data);

        if (data.success === false) setErr(data.message);
        else {
          setErr("");
          setRole("teacher");
          localStorage.setItem("id", data.user);
          localStorage.setItem("token", `Bearer ${data.token}`);
          history.push(`/teacher/${data.user}`);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" flex items-center justify-center w-full h-full min-h-screen">
      <div className="w-80 bg-white  justify-center items-center p-5 ">
        <div style={{ color: "#46535e" }} className="font-bold text-base  mb-5">
          Login as a teacher
        </div>
        {err && (
          <span
            style={{
              color: "#b11616",
              margin: "2px",
            }}
            className=" text-sm"
          >
            {err}
          </span>
        )}
        <form className="w-full flex-col items-center  justify-center ">
          <input
            type="text"
            name="email"
            placeholder="email"
            className="rounded border w-full p-2 mb-4"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            className="rounded border w-full p-2 mb-2"
            onChange={(e) => setPassword(e.target.value)}
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
                onClick={onLogin}
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
                to="/teacher/signup"
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
