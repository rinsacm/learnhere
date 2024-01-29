import { Route, Routes } from "react-router";
import Course from "./CoursePage/CoursePage";
import ModulePage from "./ModulePage/ModulePage";
import TeacherCourses from "./TeacherCourses/TeacherCourses";
import TeacherLogin from "./TeacherLogin/TeacherLogin";
import TeacherSignup from "./TeacherSignup/TeacherSignup";
import React, { useContext, useEffect } from "react";
import { AuthRoleContext } from "../../contexts/AuthRoleContext";
import { getUserRole } from "../../utils/utils";
import useAuth from "../hook/useAuth";

const TeacherRoutes = () => {
  // const { role, setRole } = useContext(AuthRoleContext);
  // useEffect(() => {
  //   async function setRoleFunc() {
  //     if (!role && localStorage.getItem("id")) {
  //       getUserRole(role).then((userRole) => {
  //         console.log(userRole);
  //         setRole(userRole);
  //       });
  //     }
  //   }
  //   setRoleFunc();
  // }, []);

  return (
    <Routes>
      <Route path="/courses/:id" element={<Course />} />
      <Route path="/my-courses" element={<TeacherCourses />} />

      <Route path="/courses/:courseid/:moduleid" element={<ModulePage />} />
    </Routes>
  );
};
export default TeacherRoutes;
