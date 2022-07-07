import React, { useContext, useEffect, useState } from "react";
import { Switch } from "react-router";
import "./Navbar.scss";
import { AuthContext } from "../../contexts/AuthContext";
import profileImg from "../../assets/profile-img.png";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AuthRoleContext } from "../../contexts/AuthRoleContext";
import { getUserRole } from "../../utils/utils";

function Navbar() {
  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setRole(null);
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div className="py-4 px-2 font-semibold text-2xl">Ann Mathew</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to="/teacher/my-courses">
          <div className="text-lg font-normal">My Courses</div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">
        <div className="text-lg font-normal">Edit profile</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5">
        <div className="text-lg font-normal" onClick={onLogout}>
          Logout{" "}
        </div>
      </Menu.Item>
    </Menu>
  );
  const { authType, setAuthType } = useContext(AuthContext);
  const { role, setRole } = useContext(AuthRoleContext);
  console.log(role);
  useEffect(() => {
    if (!role) {
      let userRole = getUserRole(role);
      console.log(userRole);
      setRole(userRole);
    }
  }, []);
  return (
    <div className="navbar-div flex justify-end">
      <Switch>
        {role ? (
          <>
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="m-3 ">
                <img
                  className="w-12 h-12  rounded-3xl"
                  src={profileImg}
                  alt=""
                />
              </div>
            </Dropdown>
          </>
        ) : (
          <div className="auth-buttons gap-2 ">
            <Link to="/">
              <div className="hover:opacity-95 text-white px-8 py-4 text-xl font-medium ">
                Home
              </div>
            </Link>

            <Link to="/student/login">
              <div className="hover:opacity-95 text-white px-8 py-4 text-xl font-medium ">
                Login
              </div>
            </Link>
            <Link to="/student/signup">
              <div
                className="hover:opacity-95 text-white px-8 py-4 text-xl font-medium "
                onClick={() => {
                  setAuthType("signup");
                }}
              >
                Signup
              </div>
            </Link>
          </div>
        )}
      </Switch>
    </div>
  );
}

export default Navbar;
