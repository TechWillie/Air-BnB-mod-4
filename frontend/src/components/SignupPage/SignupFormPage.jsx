import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


import * as sessionActions from '../../store/session'

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({})

    // If sessionUser exists (meaning a user is logged in), it redirects them to the homepage ("/").
    // The <Navigate> component (from react-router-dom) handles the redirection.
    // The replace={true} prop ensures that the redirection doesn't leave a history entry, 
    // preventing users from navigating back.
    if (sessionUser) return <Navigate to="/" replace={true} />;
    // <Navigate to="/" replace={true} />; WORKS
    console.log("sess user:", sessionUser);
    console.log(username,
                firstName,
                lastName,
                email,
                password);
    
    
    const submit = (e) => {
        e.preventDefault();
        <Navigate to="/" replace={true} />;
        // console.log('Form submitted with:', { username, firstName, lastName, email, password });
        setErrors({});

        if(password === confirmPassword){
            dispatch(sessionActions.signup({
                username,
                firstName,
                lastName,
                email,
                password
            }))
            // .then(() => console.log("Sign up successful"))

            
            const response = async(res) => {
                const data = await res.json()
                if(data?.errors){setErrors(data.errors)}
            }
            return response
        } else {setErrors({confirmPassword: "Confirm Password field must be the same as the Password field"})}
        
    } 

    return (
        <form onSubmit={submit}>
            <ul>
                {errors && Object.values(errors).map((error, indx) => <li key={indx}>{error}</li>)}
                {/* {<p>errors: {Object.values(errors).map((error, indx) => <p>{error}</p>)}</p>} */}
            </ul>
            <label>
                Username<input type='text' value={username}
                onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                First Name<input type='text' value={firstName}
                onChange={(e) => setFirstname(e.target.value)} required />
            </label>
            <label>
                Last Name<input type='text' value={lastName}
                onChange={(e) => setLastName(e.target.value)} required />
            </label>
            <label>
                Email<input type='text' value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Password<input type='text' value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
                Please confirm password<input type='text' value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required />
            </label>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button type="submit">Sign Up!</button>
        </form>
    )
}
export default SignupFormPage