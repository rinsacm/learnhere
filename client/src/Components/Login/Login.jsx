import React, { useContext, useState } from "react";
import "../Login/Login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

function Login() {
  const { autType, setAuthType } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

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
        if (res.status == 200) setAuthType(null);
        return res.json();
        // localStorage.setItem("token", `Bearer ${data.token}`);
        // localStorage.setItem("user_id", data.user.email);})
      })
      .then((data) => {
        console.log(data);
        if (data.success == false) setErr(data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal-overlay z-10 w-screen h-screen absolute">
      <div className="login-div">
        <div
          className="close-button"
          onClick={() => {
            setAuthType(null);
          }}
        >
          <i className="fas fa-times"></i>
        </div>
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
        <h5>
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
  );
}

export default Login;
