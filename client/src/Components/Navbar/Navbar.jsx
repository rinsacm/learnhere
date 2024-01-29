import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import profileImg from "../../assets/profile-img.png";
import { Menu, Dropdown, MenuProps } from "antd";
import { Link, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/context/AuthProvider";
import { getUserRole } from "../../utils/utils";
import useAuth from "../../app/hook/useAuth";

function Navbar() {
  const { auth, setAuth } = useAuth();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setAuth({ roles: [localStorage.getItem("role")] });
    console.log(auth);
  }, []);
  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setAuth(null);
    navigate("/login");
  };
  const name =
    localStorage.getItem("name") != null ? localStorage.getItem("name") : null;
  const items: MenuProps["items"] = [
    {
      label: <div className="py-4 px-2 font-semibold text-2xl">{name}</div>,
      key: 0,
    },
    {
      label: (
        <Link
          to={
            auth?.roles?.includes("teacher")
              ? "/teacher/my-courses"
              : "/student/my-courses"
          }
        >
          <div className="text-lg font-normal">My Courses</div>
        </Link>
      ),
      key: 1,
    },
    {
      label: (
        <Link to="/courses">
          <div className="text-lg font-normal">All Courses</div>
        </Link>
      ),
      key: 2,
    },
    { label: <div className="text-lg font-normal">Edit profile</div>, key: 3 },

    {
      label: (
        <div className="text-lg font-normal" onClick={onLogout}>
          Logout{" "}
        </div>
      ),
      key: 4,
    },
  ];

  // const menu = (
  //   <Menu>
  //     <Menu.Item key="0"></Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item key="1"></Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item key="4">

  //     </Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item key="5">

  //     </Menu.Item>
  //   </Menu>
  // );
  console.log(auth?.roles);

  return (
    <div className="navbar-div flex justify-end p-2">
      {localStorage.getItem("id") ? (
        <>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <div className="m-3 ">
              <img className="w-12 h-12  rounded-3xl" src={profileImg} alt="" />
            </div>
          </Dropdown>
        </>
      ) : (
        <div className="auth-buttons gap-4 ">
          <Link to="/courses">
            <div className="hover:opacity-95 text-white px-8 py-4 text-xl font-medium ">
              Courses
            </div>
          </Link>

          <Link to="/login">
            <div className="hover:opacity-95 text-white px-8 py-4 text-xl font-medium ">
              Login
            </div>
          </Link>
          <Link to="/signup">
            <div
              className="hover:opacity-95 text-white px-8 py-4 text-xl font-medium "
              onClick={() => {
                setAuth("signup");
              }}
            >
              Signup
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
