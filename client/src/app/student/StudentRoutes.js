import CoursePage from "../teacher/CoursePage/CoursePage";
import ModulePage from "./ModulePage";
import StudentCourses from "./StudentCourses";

const { Route, Routes } = require("react-router");
const { default: Login } = require("./Login/Login");
const { default: Signup } = require("./Signup/Signup");

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/my-courses" element={<StudentCourses />} />
      <Route
        path="courses/:courseid/:modules/:moduleid"
        element={<ModulePage />}
      />
    </Routes>
  );
};
export default StudentRoutes;
