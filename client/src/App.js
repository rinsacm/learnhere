import "./App.css";
import React, { useState } from "react";
import "./tailwind.output.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import { AuthContext } from "./AuthContext";
import TeacherLogin from "./Components/TeacherLogin/TeacherLogin";
import TeacherSignup from "./Components/Teacher/TeacherSignup/TeacherSignup";

function App() {
  const [authType, setAuthType] = useState(null);
  return (
    <div
      className="w-full min-h-screen m-0 pb-10"
      style={{ backgroundColor: "#f7f8fa" }}
    >
      <Router>
        <AuthContext.Provider
          value={{
            authType,
            setAuthType,
          }}
        >
          <Switch>
            <Navbar />
          </Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/teachers/login" component={TeacherLogin} />
          <Route exact path="/teachers/signup" component={TeacherSignup} />
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
