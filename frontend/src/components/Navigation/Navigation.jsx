// import { useState } from "react";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
// import * as sessionActions from '../../store/session'
import { FaHouseUser } from "react-icons/fa";
// import { FaUserPen } from "react-icons/fa6";
// import { FaUserPlus } from "react-icons/fa6";
import PropTypes from 'prop-types';

import ProfileButton from "./ProfileButton";
import  OpenModalButton  from "../OpenModalButton/OpenModalButton";
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from "../SignupModal/SignupFormModal";

import "./Navigation.css"

const Greeting = () => {
    return (
      <OpenModalButton
        buttonText="Greeting"
        modalComponent={<h2>Hello World!</h2>}
        onButtonClick={() => console.log("Greeting initiated")}
      />
    );
  };

  Navigation.propTypes = {
    isLoaded: PropTypes.bool
  };
  


function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
  
    const sessionLinks = sessionUser ? (
      <li >
        <ProfileButton user={sessionUser} />
      </li>
    ) : (
      <>
        <li >
          <OpenModalButton
            icon={<FaHouseUser />}
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li >
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
        </li>
        <li >
            <Greeting />
        </li>
      </>
    );
  
    return (
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    );
  }
  
  export default Navigation;



