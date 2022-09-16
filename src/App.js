import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from "./components/Header";

import "./App.css";

function App() {
  const [user, setUser] = useState("loading");

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      setUser(user);
    });
  }, [])

  const handleSignout = (e) => {
    signOut(auth);
    setUser(null);
  };

  const handleLogin = (user) => {
    setUser(user);
    console.log(auth.currentUser);
  }

  return (
    <div className="App">
      <Header user={user} onSignOut={handleSignout}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
