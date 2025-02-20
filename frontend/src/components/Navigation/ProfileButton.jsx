  import { useState, useEffect, useRef } from 'react';
  import { useDispatch } from 'react-redux';
  import { FaUserCircle } from 'react-icons/fa';
  import * as sessionActions from '../../store/session';
  import OpenModalButton from '../OpenModalButton/OpenModalButton';
  import LoginFormModal from '../LoginFormModal/LoginFormModal';
  import SignupFormModal from '../SignupModal/SignupFormModal';
  // import { NavLink, useNavigate } from 'react-router-dom';
  import PropTypes from 'prop-types';
  

  function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {

      e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
      setShowMenu(!showMenu);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    

    const logout = (e) => {
      e.preventDefault();
      console.log("willie logout")
      dispatch(sessionActions.logout())
      // .then(() => );
      
      console.log("done route");
    
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
      <>
        <button onClick={toggleMenu} className="button">
          <FaUserCircle />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.firstName} {user.lastName}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      </>
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