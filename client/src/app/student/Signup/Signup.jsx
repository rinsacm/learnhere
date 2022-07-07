import React, { useContext, useState } from "react";
import "../Signup/Signup.scss";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

function Signup() {
  const { autType, setAuthType } = useContext(AuthContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  let history = useHistory();

  const onSignup = (e) => {
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
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        let status = res.status;

        if (res.status === 201) history.push("/student/login");

        console.log(res);
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
      <div className="w-96 bg-white  justify-center items-center p-5 ">
        <div className="w-full ">
          {err && <span class="err-msg">{err}</span>}
          <form className="signup-form w-full relative">
            <div className="grid grid-cols-2 gap-2 w-full">
              <input
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                type="text"
                name="firstname"
                placeholder="firstname"
                className="w-full"
              />
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                name="lastname"
                placeholder="lastname"
                className="w-full"
              />
            </div>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="text-input w-full"
              type="text"
              name="username"
              placeholder="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="text-input"
              type="password"
              name="password"
              placeholder="password"
            />
            <button onClick={onSignup} type="submit" className="signup-button">
              Start Now
            </button>
          </form>
          <h5 className="text-center">
            Already have an account?{" "}
            <span>
              <Link to="/student/login">Login</Link>
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Signup;
