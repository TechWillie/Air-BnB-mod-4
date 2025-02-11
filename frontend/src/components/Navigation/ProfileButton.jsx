import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import { FaUserLargeSlash } from "react-icons/fa6";
import './Navigation.css';



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowmenu] = useState(false)
    const ulRef = useRef()
    
    // const toggle = (e) => {
    //     e.stopPropagation()
    //     setShowmenu(!showMenu)
    // }

    useEffect(() => {
        if(!showMenu) return

        const hideMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target))
            setShowmenu(false)
        }
    
        document.addEventListener("click", hideMenu)
        return document.removeEventListener("click", hideMenu)
    }, [showMenu])

  const cssMenuToggle = "profile-dropdown" + (showMenu ? "" : " hidden");

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={() => setShowmenu(!showMenu)}>
        <FaUserCircle />   {user.username}
      </button>
      <ul className={cssMenuToggle}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}><FaUserLargeSlash /> Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;