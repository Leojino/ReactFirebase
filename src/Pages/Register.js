import React, {useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
import {auth} from "../firebase-config.js";

export default function Login({onLogin}) {
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");

    if(!image) {
      setError("Upload a picture to create your user account");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message)
      return;
    }

    try{
      const imageRef = ref(storage, `/images/${email}`);
      const snapshot = await uploadBytes(imageRef, image);
    }catch( err) {
      setError(err.message);
    }

    setError(<>
      <h2>User Create successfully</h2>
      <span>Please <Link to="/login">Login</Link> to see your user page</span>
    </>)
    
  };

  const handleImageUpload = e => {
    setImage(e.target.files[0]);
  }

  return (
    <div className="login-wrapper">
      <h1>Create a new user.</h1>
      {error && 
        <div style={{border: "1px solid black", padding: 10}}>
          {error}
        </div>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Picture</p>
          <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageUpload} name="file" required={true}/>
        </label>
        <label>
          <p>Username</p>
          <input type="email" name="email" required={true}/>
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
        <Link to="/login">Login</Link> instead.
      </div>
    </div>
  );
}
