import React from "react";

export default function Header({ user, onSignOut }) {

  if (!user || user == "loading") {
    return (
      <header className="App-header">
          <span>Hello Guest</span>
      </header>
    );
  }

  return (
    <header className="App-header">
      <span>Hello {user.email}</span>
      <span onClick={onSignOut}>Sign Out</span>
    </header>
  );
}
