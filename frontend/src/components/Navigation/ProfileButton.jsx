import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupModal/SignupFormModal';
// import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProfileButton.css';
  

  function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
      console.log("willie logout")
      e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
      setShowMenu((prev) => !prev)
    };

    useEffect(() => {
      if (showMenu) console.log("MENU Appear");
       //return;
      if (!showMenu) console.log("MENU BYE BYE");

      const closeMenu = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    

    const logout = async (e) => {
      e.preventDefault();
      await dispatch(sessionActions.logout())
      setShowMenu(false)  
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
      <div className="button">
        <button onClick={(e) => {
          toggleMenu(e);
          console.log("Targert hit!!!");
        }}>
          <FaUserCircle />
        </button>
        <div className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <h2>{user.username}</h2>
              <h2>{user.firstName} {user.lastName}</h2>
              <h2>{user.email}</h2>
              <h2>
                <button onClick={logout}>Log Out</button>
              </h2>
            </>
          ) : (
            <>
              <div>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div>
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  ProfileButton.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string
    })
  };

  
export default ProfileButton;