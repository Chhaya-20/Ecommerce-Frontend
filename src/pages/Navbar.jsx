import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles.css'

function Navbar({ logout: propsLogout }) {
  const location = useLocation();
  const [token, setToken] = useState("");
  const t = localStorage.getItem('token');


  useEffect(() => {
    setToken(t);
  }, [t]);

  const logout = () => {
   
    localStorage.removeItem('token');
    setToken("");
    if (propsLogout) {
      console.log("ppppp");
      propsLogout();
    }
  };

  return (
    <nav style={{"backgroundColor":"#800080ad"}} className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link style={{"color":"white"}} className="nav-link" to="/">Home</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/cart' ? 'active' : ''}`}>
              <Link style={{"color":"white"}} className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/wishlist' ? 'active' : ''}`}>
              <Link style={{"color":"white"}} className="nav-link" to="/wishlist">WishList</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/order' ? 'active' : ''}`}>
              <Link style={{"color":"white"}} className="nav-link" to="/order">Orders</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul className="navbar-nav  mb-2 mb-lg-0">
          {token && (
            <li className={`nav-item ${location.pathname === '/logout' ? 'active' : ''}`}>
              <button style={{"color":"white"}}  onClick={logout} className="nav-link" to="/logout">Logout</button>
            </li>
          )}
          {!token && (
            <>
              <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                <Link  style={{"color":"white"}} className="nav-link" to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
