
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import * as sessionActions from "../../store/session"
import './SignupForm.css';


export default function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const history = useHistory()


    // if (sessionUser) return <Redirect to="/discover" />;
    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
                .then(() => history.push('/discover'))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log(data.errors)

                    if (data && data.errors) setErrors(data.errors)
                })
        }
        return setErrors(['Confirm Password field must be the same as the Password field'])
    }
    return (
        <form onSubmit={handleSubmit}>
            {hasSubmitted && errors.length > 0 && <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>}
            <label>
                First Name:
                <input type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </label>
            <label>
                Last Name:
                <input type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </label>
            <label>
                Username:
                <input type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Confirm Password:
                <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button type='submit'>Sign Up</button>
        </form>
    )
}
