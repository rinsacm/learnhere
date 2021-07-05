import React,{useContext}  from 'react'
import Login from "../Login/Login"
import Signup from '../Signup/Signup';
import "../Home/Home.scss"
import {AuthContext} from  "../../AuthContext"



function Home() {
    const {authType,setAuthType}=useContext(AuthContext)
    return (
        <div className="home-div">
            {
               (authType==="login"&&<Login/> )|| (authType==="signup"&&<Signup/>)
               
            }
           
            
        </div>
    );
}

export default Home
