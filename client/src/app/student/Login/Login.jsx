import React, { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAuth from "../../hook/useAuth";

function Login() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [studentErr, setStudentErr] = useState(null);
  const [teacherErr, setTeacherErr] = useState(null);
  const { auth, setAuth } = useAuth();
  let history = useNavigate();

  const onStudentLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/user/login", {
      method: "POST",
      credentials: "include",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: studentEmail,
        password: studentPassword,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // localStorage.setItem("user_id", data.user.email);
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setAuth({ roles: ["student"] });
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.user);
        localStorage.setItem("role", "student");
        localStorage.setItem("token", `Bearer ${data.token}`);

        if (data.success === false) setStudentErr(data.message);
        else history("/");
      })
      .catch((err) => console.log(err));
  };
  const onTeacherLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/teacher/login", {
      method: "POST",
      credentials: "include",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: teacherEmail,
        password: teacherPassword,
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

        if (data.success === false) setTeacherErr(data.message);
        else {
          setTeacherErr("");
          setAuth({ roles: ["teacher"] });
          localStorage.setItem("name", data.name);
          localStorage.setItem("id", data.user);
          localStorage.setItem("token", `Bearer ${data.token}`);
          localStorage.setItem("role", "teacher");

          history(`/teacher/${data.user}`);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" flex items-center justify-center w-full gap-4 h-full min-h-screen">
      <div className="w-96 bg-white  justify-center items-center p-5 ">
        <div style={{ color: "#46535e" }} className="font-bold text-base  mb-5">
          Login as a student
        </div>
        <div className="w-full">
          {studentErr && <span class="err-msg">{studentErr}</span>}
          <form className="login-form">
            <input
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="rounded border w-full p-2 mb-4"
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              className="rounded border w-full p-2 mb-4"
              type="password"
              name="password"
              placeholder="password"
            />
            {/* <Link className="forgot-password-link">forgot password?</Link> */}
            <button
              style={{ backgroundColor: "#33adff" }}
              onClick={(e) => onStudentLogin(e)}
              type="submit"
              className="login-button"
            >
              Login <i className="fas fa-sign-in-alt"></i>
            </button>
          </form>
          <div className="flex w-full justify-center my-4">
            <div style={{ color: "#46535e" }} className="text-sm">
              Don't have an account?
            </div>
            <span>
              <Link
                style={{ color: "#4c9cdf" }}
                to="/signup"
                className="text-sm"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="w-80 bg-white  justify-center items-center p-5 ">
        <div style={{ color: "#46535e" }} className="font-bold text-base  mb-5">
          Login as a teacher
        </div>
        {teacherErr && (
          <span
            style={{
              color: "#b11616",
              margin: "2px",
            }}
            className=" text-sm"
          >
            {teacherErr}
          </span>
        )}
        <form className="w-full flex-col items-center  justify-center ">
          <input
            type="text"
            name="email"
            placeholder="email"
            className="rounded border w-full p-2 mb-4"
            onChange={(e) => setTeacherEmail(e.target.value)}
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            className="rounded border w-full p-2 mb-2"
            onChange={(e) => setTeacherPassword(e.target.value)}
          />
          {/* <Link
            to="/"
            style={{ color: "#4c9cdf" }}
            className="text-sm my-2  w-full justify-end flex"
          >
            forgot password?
          </Link> */}
          <div className="flex justify-center items-center w-full">
            <Link>
              <button
                style={{ backgroundColor: "#33adff" }}
                className="w-52 mx-auto p-2 font-bold text-white rounded-sm"
                onClick={onTeacherLogin}
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
                to="/signup"
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

export default Login;
