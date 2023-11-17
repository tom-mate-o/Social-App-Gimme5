//loginToApp.jsx

import React, { useRef, useEffect, useContext } from "react";
import { compareLoginToDatabase } from "../../utils/compareLoginToDatabase";
import showNotification from "../showNotifications/showNotifications";
import { useNavigate } from "react-router-dom";
import UsernameContext from "../userName/userNameContext";
import { getUserNameFromDatabase } from "../../utils/getUserNameFromDatabase";
import logo from "../../assets/img/g5-logo.svg";


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
  

      <img src={logo} alt="GIMME5 Logo" />

      <p style={{textAlign: 'center'}}>
        <h3>Welcome to Gimme 5!</h3>
        <br />
        Gimme 5 is your go-to social media platform for creating and sharing Top
        5 lists. Whether it's your favorite movies, travel destinations, or
        music tracks, express yourself by curating and showcasing your top
        picks. Dive into the world of Gimme 5, where your lists become
        conversations and connections. 
        <br />
        <br />
        Ready to share your favorites? 
        <br />
        Log in and
        let the countdown begin!
      </p>

      <form className="register-form" onSubmit={handleClick}>
        <input ref={email} id="email" type="email" placeholder="E-Mail" />

        <input
          ref={password}
          id="password"
          type="password"
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>

      <a href="/login">Forgot Password?</a>
      <p>
        Don't have an account yet? <a href="/register">Register here.</a>{" "}
      </p>
    </div>
  );
}
