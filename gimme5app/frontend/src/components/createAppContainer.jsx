import React from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import Feed from "../components/pages/feed";
import Login from "../components/pages/login";
import Register from "../components/pages/register";
import Profile from "../components/pages/profile";
import Settings from "../components/pages/settings";
import Search from "../components/pages/search";

/// Styled Components
import { Navbar } from "../styled/Navbar";
import { ContentContainer } from "../styled/ContentContainer";
import { NavigationIcons } from "../styled/NavigationIcons";
import { NavbarLogo } from "../styled/NavbarLogo";

export default function AppContainer() {

    return (
        <div>
            <BrowserRouter>
            <Navbar>

              <NavbarLogo>
              <img src="\frontend\public\gimme5logo.png" alt="gimme5logo"/>
              </NavbarLogo>

          <NavigationIcons>
          <ul className="header">
            
          
            <li>
              <NavLink to="/">Feed</NavLink>
            </li>

            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            

            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>

            <li>
              <NavLink to="/settings">Settings</NavLink>
            </li>

            <li>
              <NavLink to="/login">Login</NavLink>
            </li>

            <li>
              <NavLink to="/register">Register</NavLink>
            </li>

          </ul>
          </NavigationIcons>
          </Navbar>
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </ContentContainer>
        </BrowserRouter>
        </div>
    );
}
