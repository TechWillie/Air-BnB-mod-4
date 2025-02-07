import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'
import * as sessionActions from '../../store/session'

function LoginFormPage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Navigate to="/" />;
    // On submit of the form, 
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        // dispatch the login thunk action with the form input values. 
        return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
            const data = await res.json();
        // Make sure to handle and display errors from the login thunk action if there are any.
          if (data?.errors) setErrors(data.errors);
        });
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username or email <input type="text" value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required />
            </label>
            <label>
                Password <input type="text" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </label>
            (errors.credential && <p>{errors.credential}</p>)
            <button type='submit'>log In</button>
        </form>
    )
}
export default LoginFormPage