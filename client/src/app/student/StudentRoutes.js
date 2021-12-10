const { Switch, Route } = require("react-router");
const { default: Login } = require("./Login/Login");
const { default: Signup } = require("./Signup/Signup");

const StudentRoutes = () => {
  return (
    <Switch>
      <Route exact path="/student/login">
        <Login />
      </Route>
      <Route exact path="/student/signup">
        <Signup />
      </Route>
    </Switch>
  );
};
export default StudentRoutes;
