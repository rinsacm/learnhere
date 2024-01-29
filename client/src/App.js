import "./App.css";
import React, { useEffect, useState } from "react";
import "./tailwind.output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { AuthContext } from "./contexts/AuthContext";
import { AuthRoleContext } from "./contexts/AuthRoleContext";
import AllRoutes from "./AllRoutes";
import { AuthProvider } from "./app/context/AuthProvider";
import useAuth from "./app/hook/useAuth";

function App() {
  const [role, setRole] = useState("");

  return (
    <div
      className="w-full h-full min-h-screen relative font-encodasans"
      style={{ backgroundColor: "#f7f8fa" }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Navbar />

          <AllRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
