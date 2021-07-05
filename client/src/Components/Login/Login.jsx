import React,{useContext} from 'react'
import "../Login/Login.scss"
import {Link} from "react-router-dom"
import {AuthContext} from "../../AuthContext"

function Login() {
    const {autType,setAuthType}=useContext(AuthContext);
    return (
        <div className="modal-overlay">
            <div class="login-div">
            <div class="close-button" onClick={()=>{
                setAuthType(null)
              }}><i class="fas fa-times"></i></div>
                <form class="login-form">
                    <input className="text-input" type="text" name="username" placeholder="username" />
                    <input className="text-input" type="password" name="password" placeholder="password"/>
                    <Link className="forgot-password-link">forgot password?</Link>
                    <button type="submit" className="login-button">Login <i class="fas fa-sign-in-alt"></i></button>
                    
                </form>
                <h5>Don't have an account? <span><Link onClick={()=>{
                setAuthType("signup")
              }}>Signup</Link></span></h5>

            </div>
        </div>
    )
}

export default Login
