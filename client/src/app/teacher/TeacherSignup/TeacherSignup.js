import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function TeacherSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");

  let history = useHistory();

  const onSignup = (e) => {
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
        email: email,
        job: job,
        company: company,
        skills: skills,
        password: password,
      }),
    })
      .then((res) => {
        let status = res.status;

        if (res.status === 201) {
          console.log(res);
          history.push("/teacher/login");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success === false) setErr(data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" flex items-center justify-center w-full h-full min-h-screen">
      <div className="w-80 bg-white  justify-center items-center p-5 ">
        <div style={{ color: "#46535e" }} className="font-bold text-base  mb-5">
          Signup as a teacher
        </div>
        {err && (
          <span
            style={{
              color: "#b11616",
              margin: "2px",
            }}
            className="pl-3 text-sm"
          >
            {err}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
                onClick={onSignup}
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
                to="/teacher/login"
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
