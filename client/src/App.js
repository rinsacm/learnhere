import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import { AuthContext } from "./AuthContext";

function App() {
  const [authType, setAuthType] = useState(null);
  return (
    <div className="App">
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
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
