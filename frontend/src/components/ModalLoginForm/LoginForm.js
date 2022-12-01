import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DemoUser from "../DemoUser";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).then(() => history.push('/discover')).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
  }
  const demo = e => {
    e.preventDefault();
    const credential = 'Demo-lition';
    const password = 'password';
    return dispatch(sessionActions.login({ credential, password })).then(() => history.push('/discover')
    );
  };
  return (
    <>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2 className="well">Welcome Back!</h2>
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>{error}</li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="inputs">
            Username or Email:
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className="inputs">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="sign-in-button">Sign in</button>
            or
            <button className='sign-up-button-demo' onClick={demo}>Demo User</button>

          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
