//createAppContainer.jsx

import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import Feed from "../components/pages/feed";
import NewPost from "./pages/newpost";
import Login from "../components/pages/login";
import Register from "../components/pages/register";
import Profile from "../components/pages/profile";
import Settings from "../components/pages/settings";
import Search from "../components/pages/search";
import showNotification from "./showNotifications/showNotifications";
import UsernameContext from "./userName/userNameContext";

/// Styled Components
import { Navbar } from "../styled/Navbar";
import { ContentContainer } from "../styled/ContentContainer";
import { NavigationIcons } from "../styled/NavigationIcons";
import { NavbarLogo } from "../styled/NavbarLogo";
import logo from "../assets/img/g5-logo.svg";
import { ToastContainer } from 'react-toastify';

export default function AppContainer() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // get token from local storage and set state to true if token is present
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, [])
    const handleLogout = () => {
      setLoggedIn(false);
      localStorage.removeItem("token");
      showNotification("Bye, for now! 👋", "");
    };
    const handleLogin = () => {
      setLoggedIn(true);
    };
  

  return (
    <div>
      <BrowserRouter>
      <UsernameContext.Provider value={{ username, setUsername }}>
        <Navbar className="navbar">
          <NavbarLogo>
            <img src={logo} alt="GIMME5 Logo" />
          </NavbarLogo>
          <ToastContainer />
          <NavigationIcons>
            <ul className="main-navigation">
              <li>
                <NavLink className="feed" to="/">Feed</NavLink>
              </li>

              <li>
                <NavLink className="newpost" to="/newpost">New Post</NavLink>
              </li>

              <li>
                <NavLink className="search" to="/search">Search</NavLink>
              </li>

              <li>
                <NavLink className="profile" to="/profile">Profile</NavLink>
              </li>

              <li>
                <NavLink className="settings" to="/settings">Settings</NavLink>
              </li>

              <li>
                <NavLink to="/login">Login</NavLink>
              </li>

              <li>
                <NavLink to="/login" onClick={handleLogout}>Logout</NavLink>
              </li>

              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          </NavigationIcons>
        </Navbar>
        <ContentContainer className="content">
          <Routes>
            <Route path="/" element={loggedIn ? <Feed/> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>} />
            <Route path="/feed" element={loggedIn ? <Feed /> : <Login replace/>} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </ContentContainer>
        </UsernameContext.Provider>
      </BrowserRouter>
    </div>
  );
}
