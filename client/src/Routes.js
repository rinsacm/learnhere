import { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./app/Home/Home";
import StudentRoutes from "./app/student/StudentRoutes";
import TeacherRoutes from "./app/teacher/TeacherRoutes";
import { AuthRoleContext } from "./contexts/AuthRoleContext";
import { getUserRole } from "./utils/utils";

const Routes = () => {
  const { role, setRole } = useContext(AuthRoleContext);
  useEffect(async () => {
    if (!role && localStorage.getItem("id")) {
      getUserRole(role).then((userRole) => {
        console.log(userRole);
        setRole(userRole);
      });
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/teacher">
        <TeacherRoutes />
      </Route>
      <Route path="/student">
        <StudentRoutes />
      </Route>
    </Switch>
  );
};

export default Routes;
