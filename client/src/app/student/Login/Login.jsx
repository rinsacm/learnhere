import React, { useContext, useState } from "react";
import "./Login.scss";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthRoleContext } from "../../../contexts/AuthRoleContext";

function Login() {
  const { autType, setAuthType } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const { role, setRole } = useContext(AuthRoleContext);
  let history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/user/login", {
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
        if (res.status === 200) return res.json();
        // localStorage.setItem("token", `Bearer ${data.token}`);
        // localStorage.setItem("user_id", data.user.email);})
      })
      .then((data) => {
        console.log(data);
        setRole("student");
        localStorage.setItem("id", data.user);
        if (data.success === false) setErr(data.message);
        else history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" flex items-center justify-center w-full h-full min-h-screen">
      <div className="w-96 bg-white  justify-center items-center p-5 ">
        <div className="w-full">
          {err && <span class="err-msg">{err}</span>}
          <form className="login-form">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-input"
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-input"
              type="password"
              name="password"
              placeholder="password"
            />
            <Link className="forgot-password-link">forgot password?</Link>
            <button
              onClick={(e) => onLogin(e)}
              type="submit"
              className="login-button"
            >
              Login <i className="fas fa-sign-in-alt"></i>
            </button>
          </form>
          <h5 className="text-center">
            Don't have an account?{" "}
            <span>
              <Link
                onClick={() => {
                  setAuthType("signup");
                }}
              >
                Signup
              </Link>
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
