import {useState} from 'react'
import { useDispatch } from 'react-redux'

import * as sessionActions from '../../store/session'

function SignupFormPage() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [firstname, setFirstmane] = useState("");
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([])


    const submit = (e) => {
        e,prevventDefault();
        setErrors([]);

        if(password === confirmPassword){
            dispatch(sessionActions.signup({
                username,
                firstName,
                lastName,
                email,
                password
            }))
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
              });
        }
        return setErrors(['Confirm Password field must be the same as the Password field'])
    }

    return (
        <form onSubmit={submit}>
            <ul>
                {errors.mao((erroe, indx) => <li key={indx}>{error}</li>)}
            </ul>
            <label>
                Username<input type='text' value={username}
                onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                First Name<input type='text' value={firstName}
                onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Last Name<input type='text' value={lastName}
                onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Email<input type='text' value={email}
                onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Password<input type='text' value={password}
                onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Please confirm password<input type='text' value={confirmPassword}
                onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <button type='submit'>Sign Up!</button>
        </form>
    )
}
export default SignupFormPage