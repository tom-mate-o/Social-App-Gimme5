import React, {Component} from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import Feed from "../components/pages/Feed";
import Login from "../components/pages/login";
import Register from "../components/pages/register";
import Profile from "../components/pages/profile";

/// Styled Components
import { Navbar } from "../styled/Navbar";
import { ContentContainer } from "../styled/ContentContainer";

export default function AppContainer() {

    return (
        <div>
            <BrowserRouter>
            <Navbar>
          <ul className="header">
            <li>
              <NavLink to="/">Feed</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
          </Navbar>
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </ContentContainer>
        </BrowserRouter>
        </div>
    );
}
