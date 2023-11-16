//loginToApp.jsx

import React, { useRef, useEffect, useContext } from "react";
import { compareLoginToDatabase } from "../../utils/compareLoginToDatabase";
import showNotification from "../showNotifications/showNotifications";
import { useNavigate } from "react-router-dom";
import UsernameContext from "../userName/userNameContext";
import { getUserNameFromDatabase } from "../../utils/getUserNameFromDatabase";


export default function LoginToApp({handleLogin, loggedIn}) {

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const {setUsername} = useContext(UsernameContext);


useEffect(() => {
  if (loggedIn) {
    navigate('/feed');
  }
}, [loggedIn, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();

    const data ={
    email: email.current.value,
    password: password.current.value,
    }

    console.log("handle click");
    
    try{
      const res = await compareLoginToDatabase(data);
      if (res) {
        localStorage.setItem("token", res.token);
        handleLogin(true);
        const username = await getUserNameFromDatabase(data.email);
        setUsername(username);
        localStorage.setItem("username", username);
        
      }
    }catch(error){
      showNotification("ERROR", "error");
  }
};
  

  return (
    <div className="login">
      <h1>Login</h1>

      <p>
        Kurze App-Beschreibung. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </p>

      
      <input ref={email} id="email" type="email" placeholder="E-Mail"/>

      <input
        ref={password}
        id="password"
        type="password"
        placeholder="Password"
       
      />

      <button onClick={handleClick}>Login</button>

      <a href="/login">Forgot Password?</a>
      <p>
        Don't have an account yet? <a href="/register">Register here.</a>{" "}
      </p>
    </div>
  );
}
