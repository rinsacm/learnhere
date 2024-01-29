import React, { useContext, useState } from "react";
import "../Signup/Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

function Signup() {
  const { autType, setAuthType } = useContext(AuthContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentErr, setStudentErr] = useState(null);

  const [name, setName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState(null);
  const [teacherPassword, setTeacherPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [teacherErr, setTeacherErr] = useState("");
  let navigate = useNavigate();

  const onStudentSignup = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/user/signup", {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: studentEmail,
        password: studentPassword,
      }),
    })
      .then((res) => {
        let status = res.status;

        if (res.status === 201) {
          navigate("/login");
        }

        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("name", data.name);
        if (data.success === false) setStudentErr(data.message);
      })
      .catch((err) => console.log(err));
  };

  let history = useNavigate();

  const onTeacherSignup = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/teacher/signup", {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: teacherEmail,
        job: job,
        company: company,
        skills: skills,
        password: teacherPassword,
      }),
    })
      .then((res) => {
        let status = res.status;

        if (res.status === 201) {
          console.log(res);
          history.push("/login");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success === false) setTeacherErr(data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" flex items-center justify-center gap-4 w-full h-full min-h-screen">
      <div className="w-96 bg-white  justify-center items-center p-5 ">
        <div className="w-full  p-2">
          <div
            style={{ color: "#46535e" }}
            className="font-bold text-base  mb-5"
          >
            Signup as a student
          </div>
          {studentErr && <span class="err-msg">{studentErr}</span>}
          <form className="signup-form w-full relative">
            <div className="grid grid-cols-2 gap-2 w-full">
              <input
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                type="text"
                name="firstname"
                placeholder="firstname"
                className="rounded border w-full p-2 mb-4"
              />
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                name="lastname"
                placeholder="lastname"
                className="rounded border w-full p-2 mb-4"
              />
            </div>

            <input
              onChange={(e) => setStudentEmail(e.target.value)}
              value={studentEmail}
              className="rounded border w-full p-2 mb-4"
              type="text"
              name="username"
              placeholder="email"
            />
            <input
              onChange={(e) => setStudentPassword(e.target.value)}
              value={studentPassword}
              className="rounded border w-full p-2 mb-4"
              type="password"
              name="password"
              placeholder="password"
            />
            <button
              onClick={onStudentSignup}
              type="submit"
              className="signup-button"
            >
              Start Now
            </button>
          </form>
          <div className="flex w-full justify-center my-4">
            <div style={{ color: "#46535e" }} className="text-sm">
              Already have an account?
            </div>
            <span>
              <Link
                style={{ color: "#4c9cdf" }}
                to="/login"
                className="text-sm"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="w-80 bg-white  justify-center items-center p-5 ">
        <div style={{ color: "#46535e" }} className="font-bold text-base  mb-5">
          Signup as a teacher
        </div>
        {teacherErr && (
          <span
            style={{
              color: "#b11616",
              margin: "2px",
            }}
            className="pl-3 text-sm"
          >
            {teacherErr}
          </span>
        )}
        <form className="w-full flex-col items-center  justify-center ">
          <input
            type="text"
            name="name"
            placeholder="name"
            className="rounded border w-full p-2 mb-4"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="rounded border w-full p-2 mb-4"
            onChange={(e) => setTeacherEmail(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-1">
            <input
              type="text"
              name="job"
              placeholder="job"
              className="rounded border w-full p-2 mb-4"
              onChange={(e) => setJob(e.target.value)}
            />
            <input
              type="text"
              name="company"
              placeholder="company
            "
              className="rounded border w-full p-2 mb-4"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <input
            type="text"
            name="skills"
            aria-multiline
            placeholder="skills"
            className="rounded border w-full p-2 mb-4"
            onChange={(e) => setSkills(e.target.value)}
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            className="rounded border w-full p-2 mb-4"
            onChange={(e) => setTeacherPassword(e.target.value)}
          />
          <input
            name="confirm-password"
            placeholder="Retype password"
            type="password"
            className="rounded border w-full p-2 mb-4"
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <div className="flex justify-center items-center w-full">
            <Link>
              <button
                style={{ backgroundColor: "#33adff" }}
                className="w-52 mx-auto p-2 font-bold text-white rounded-sm"
                onClick={onTeacherSignup}
              >
                Sign Up
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
                to="/login"
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

export default Signup;
