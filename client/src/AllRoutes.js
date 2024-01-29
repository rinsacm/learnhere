import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./app/Home/Home";
import StudentRoutes from "./app/student/StudentRoutes";
import TeacherRoutes from "./app/teacher/TeacherRoutes";
import { AuthRoleContext } from "./contexts/AuthRoleContext";
import { getUserRole } from "./utils/utils";
import Login from "./app/student/Login/Login";
import Signup from "./app/student/Signup/Signup";
import ProtectedRoute from "./app/otherRoutes/ProtectedRoute";
import useAuth from "./app/hook/useAuth";
import AllCourses from "./app/commonRoutes/AllCourses";
import CourseDetails from "./app/commonRoutes/CourseDetails";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/courses" element={<AllCourses />} />

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route exact path="/" element={Home} />
        <Route path="/student/*" element={<StudentRoutes />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/courses/:courseid" element={<CourseDetails />} />
      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="/teacher/*" element={<TeacherRoutes />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
