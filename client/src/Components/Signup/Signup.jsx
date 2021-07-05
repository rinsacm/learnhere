import React, { useContext } from 'react'
import "../Signup/Signup.scss"
import {Link} from "react-router-dom"
import {AuthContext} from "../../AuthContext"

function Signup() {
  const {autType,setAuthType}=useContext(AuthContext);
  
  return (
    <div className="modal-overlay">
            <div className="signup-div">
              <div className="close-button" onClick={()=>{
                setAuthType(null)
              }}><i className="fas fa-times"></i></div>
                <form className="signup-form">
                    
                    <div><input  type="text" name="firstname" placeholder="firstname" /><input  type="text" name="lastname" placeholder="lastname" /></div>                   

                    <input className="text-input" type="text" name="username" placeholder="email" />
                    <input className="text-input" type="password" name="password" placeholder="password"/>
                    <button type="submit" className="signup-button">Start Now</button>
                    
                </form>
                <h5>Already have an account? <span><Link onClick={()=>{
                setAuthType("login")
              }}>Login</Link></span></h5>

            </div>
        </div>
  )
}

export default Signup
