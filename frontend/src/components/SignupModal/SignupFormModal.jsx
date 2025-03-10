import {useState} from 'react'
import { useDispatch } from 'react-redux/alternate-renderers'
// import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/modal';
import * as sessionActions from '../../store/session'
import "./signupform.css"


function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        setErrors({});
        return dispatch(
          sessionActions.signup({
            email,
            username,
            firstName,
            lastName,
            password
          })
        )
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
              setErrors(data.errors);
            }
          });
      }
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    };
  
    return (
      <div className='fader'>
        <form className='popup' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
          <label>
            <input
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <label>
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p>{errors.username}</p>}
          <label>
            <input
              type="text"
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p>{errors.firstName}</p>}
          <label>
            <input
              type="text"
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p>{errors.lastName}</p>}
          <br /><br />
          <label>
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <label>
            <input
              type="password"
              placeholder='* Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p>{errors.confirmPassword}</p>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
  
  export default SignupFormModal;