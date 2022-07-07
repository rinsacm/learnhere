import { Route, Switch } from "react-router";
import Course from "./CoursePage/CoursePage";
import ModulePage from "./ModulePage/ModulePage";
import TeacherCourses from "./TeacherCourses/TeacherCourses";
import TeacherLogin from "./TeacherLogin/TeacherLogin";
import TeacherSignup from "./TeacherSignup/TeacherSignup";

const TeacherRoutes = () => {
  return (
    <Switch>
      <Route exact path="/teacher/login">
        <TeacherLogin />
      </Route>
      <Route exact path="/teacher/signup">
        <TeacherSignup />
      </Route>
      <Route exact path="/teacher/my-courses">
        <TeacherCourses />
      </Route>
      <Route exact path="/teacher/courses/:courseid">
        <Course />
      </Route>
      <Route exact path="/teacher/courses/:courseid/:module">
        <ModulePage />
      </Route>
    </Switch>
  );
};
export default TeacherRoutes;
