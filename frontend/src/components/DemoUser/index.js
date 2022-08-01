
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './DemoUser.css'

function DemoUser() {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault();
        const credential = 'Demo-lition';
        const password = 'password';
        history.push('/discover')

        return dispatch(sessionActions.login({ credential, password }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <button className='demo' type='submit'>Demo</button>
        </form>
    );
};
export default DemoUser
