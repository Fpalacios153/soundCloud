
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

                    if (data && data.errors) setErrors(data.errors)
                })
        }
        return setErrors(['Confirm Password field must be the same as the Password field'])
    }
    return (
        <form onSubmit={handleSubmit}
            className='sign-up-form'>
            <h2 className='create-title'> Create your CloudSounds account</h2>
            {hasSubmitted && errors.length > 0 &&
                <ul style={{ padding: '10px', color: 'red', listStyle: 'none' }}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
            <div className='sign-up-div'>

                <label className='sign-up-label'>
                    First Name:
                    <input
                        placeholder='First Name'
                        className='sign-up-input'
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label className='sign-up-label'>
                    Last Name:
                    <input
                        placeholder='Last Name'
                        className='sign-up-input'
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label >
                <label className='sign-up-label'>
                    Username:
                    <input
                        placeholder='Username'
                        className='sign-up-input'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label className='sign-up-label'>
                    Email:
                    <input
                        placeholder='Email'

                        className='sign-up-input'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className='sign-up-label'>
                    Password:
                    <input
                        placeholder='Password'

                        className='sign-up-input'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label className='sign-up-label'>
                    Confirm Password:
                    <input
                        placeholder='Confirm Password'
                        className='sign-up-input'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button className='sign-up-button' type='submit'>Sign Up</button>
        </form>
    )
}
