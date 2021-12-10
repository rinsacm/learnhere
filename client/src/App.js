import "./App.less";
import React, { useEffect, useState } from "react";
import "./tailwind.output.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthContext } from "./contexts/AuthContext";
import Routes from "./Routes";
import { AuthRoleContext } from "./contexts/AuthRoleContext";

function App() {
  const [authType, setAuthType] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {});
  return (
    <div
      className="w-full h-full min-h-screen relative font-encodasans"
      style={{ backgroundColor: "#f7f8fa" }}
    >
      <Router>
        <AuthContext.Provider
          value={{
            authType,
            setAuthType,
          }}
        >
          <AuthRoleContext.Provider
            value={{
              role,
              setRole,
            }}
          >
            <Switch>
              <Navbar />
            </Switch>

            <Routes />
          </AuthRoleContext.Provider>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
