// import { useState } from "react";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileButton from "./ProfileButton";
import logo from "../../../../images/ABNB_logo.png";




import "./Navigation.css"

// const Greeting = () => {
//     return (
//       <OpenModalButton
//         buttonText="Greeting"
//         modalComponent={<h2>Hello World!</h2>}
//         onButtonClick={() => console.log("Greeting initiated")}
//       />
//     );
//   };

  Navigation.propTypes = {
    isLoaded: PropTypes.bool
  };
  


function Navigation({ isLoaded }) {

  const sessionUser = useSelector((state) => state.session.user);
  
    const sessionLinks = sessionUser ? (
      <li className="nav-container">
        <ProfileButton user={sessionUser} />
      </li>
    ) : (
      <>
      
        <nav className="nav-container">
      {/* <div className="login_signup">
      <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        <OpenModalButton
            buttonText="Sign Up" 
            modalComponent={<SignupFormModal />}
          />
        </div> */}
      <ProfileButton />
    </nav>
      </>
    );
  
    return (
      <>
        <div className="top-bar">
          <NavLink to="/"><img src={logo} alt="Logo" className="logo-air" /></NavLink>
        {isLoaded && sessionLinks}
        </div>
      
      
      
      
      </>
    );
  }
  
  export default Navigation;



