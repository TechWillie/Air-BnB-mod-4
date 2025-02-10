// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import * as sessionActions from '../../store/session'
import { FaHouseUser } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserLargeSlash } from "react-icons/fa6";
import ProfileButton from "./ProfileButton";


function Navigation(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const loginHandle = e => {
        e.preventDefault();
        dispatch(sessionActions.logout())
    }
    return (
        <ul>
            <li><NavLink to='/'><FaHouseUser /> Home</NavLink></li>
            {sessionUser ? (
                <li><ProfileButton user={sessionUser} /></li>
            ) : (
                <>
                    <li><NavLink to="/login">Log In</NavLink></li>
                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                </>
            )}
        </ul>
    )
}

export default Navigation