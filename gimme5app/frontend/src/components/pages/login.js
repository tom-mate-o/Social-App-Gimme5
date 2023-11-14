import React from "react";
import LoginToApp from "../login/loginToApp";
 
const Login = ({handleLogin, loggedIn}) => {
    return (
      
        <LoginToApp handleLogin={handleLogin} loggedIn={loggedIn}/>
     
    );
  }

export default Login;