import React, { useContext } from 'react'
import "./Navbar.scss"
import {AuthContext} from "../../AuthContext"

function Navbar() {
    const{authType,setAuthType}=useContext(AuthContext)
    return (
        <div className="navbar-div">
            <div className="auth-buttons"><button onClick={()=>{
                setAuthType("login")
            }}>Login</button>
            <button onClick={()=>{
                setAuthType("signup")
            }}>Signup</button></div>
            
        </div>
    )
}

export default Navbar
