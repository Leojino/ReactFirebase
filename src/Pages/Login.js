import React, {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase-config.js";
import { useNavigate, Link } from 'react-router-dom'

export default function Login({onLogin}) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      onLogin(response.user)
      navigate("/")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      {error && 
        <div style={{border: "1px solid black", padding: 10}}>
          {error}
        </div>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" name="email" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" />
        </label>
        <div className="buttons">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <br/>
        <br/>
        <Link to="/register">Register</Link> as a new user.
      </div>
    </div>
  );
}
