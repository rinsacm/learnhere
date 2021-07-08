import React, { useContext, useState } from 'react'
import "../Signup/Signup.scss"
import {Link,Redirect} from "react-router-dom"
import {AuthContext} from "../../AuthContext"

function Signup() {
  const {autType,setAuthType}=useContext(AuthContext);
  const [firstname,setFirstname]=useState("");
  const [lastname,setLastname]=useState("")
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  const onSignup=(e)=>{
    e.preventDefault();
    fetch("http://localhost:3001/user/signup",{
      method:"POST",
      credentials:"include",
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password
      })
    }).then((res)=>{
      let status=res.status;
      
      if(res.status==201)
      setAuthType("login")
      
      console.log(res)
     return res.json()
    }).then((data)=>{
      console.log(data)
    }).catch((err)=>console.log(err))

  }
 
  return (
    <div className="modal-overlay">
            <div className="signup-div">
              <div className="close-button" onClick={()=>{
                setAuthType(null)
              }}><i className="fas fa-times"></i></div>
                <form className="signup-form">
                    
                    <div><input onChange={(e)=>setFirstname(e.target.value)}  value={firstname} type="text" name="firstname" placeholder="firstname" /><input value={lastname} onChange={(e)=>setLastname(e.target.value)}  type="text" name="lastname" placeholder="lastname" /></div>                   

                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className="text-input" type="text" name="username" placeholder="email" />
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className="text-input" type="password" name="password" placeholder="password"/>
                    <button onClick={onSignup} type="submit" className="signup-button">Start Now</button>
                    
                </form>
                <h5>Already have an account? <span><Link onClick={()=>{
                setAuthType("login")
              }}>Login</Link></span></h5>

            </div>
        </div>
  )
}

export default Signup
