// import { useState } from "react";
import { useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileButton from "./ProfileButton";
import logo from "../../../../images/ABNB_logo.png";


// import * as sessionActions from '../../store/session'
import { FaHouseUser } from "react-icons/fa";
import { FaUserPen, FaUserPlus } from "react-icons/fa6";

import  OpenModalButton  from "../OpenModalButton/OpenModalButton";
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from "../SignupModal/SignupFormModal";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  
    const sessionLinks = sessionUser ? (
      <li >
        <ProfileButton user={sessionUser} />
      </li>
    ) : (
      <>
        <nav className="nav-container">
      <div className="logo">
        
      </div>
      <div className="login_signup">
      <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        <OpenModalButton
            buttonText="Sign Up" 
            modalComponent={<SignupFormModal />}
          />
      </div>
    </nav>
      </>
    );
  
    return (
      <>
        <div className="top-bar">
          <NavLink to="/"><img src={logo} alt="Logo" className="logo-air" /></NavLink>
        </div>
        {isLoaded && sessionLinks}
      
      
      
      
      </>
    );
  }
  
  export default Navigation;



