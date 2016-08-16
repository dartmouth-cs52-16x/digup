import React from 'react';
import { Link } from 'react-router';

// NavBar is dumb component as it has nothing to store in state
const NavBar = () => {
  return (
    <div className="Navbar">
      <Link to="/" className="siteName">Digup</Link>
      <Link to="posts/new">New lost or found Item</Link>
      <Link to="profile">Profile</Link>
    </div>
  );
};

export default NavBar;
