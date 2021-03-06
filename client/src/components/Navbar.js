import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./assets/logo-blue.png";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const [click, setClick] = useState(false);

  const iconMenu = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const unauthenticatedNavBar = () => {
    return (
      <>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            {" "}
            <i className="fas fa-home icons"></i>
            <p className="icon">Home</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Info" className="nav-links" onClick={closeMobileMenu}>
            {" "}
            <i className="fas fa-info-circle icons"></i>
            <p className="icon">Information</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/searchschool"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            {" "}
            <i className="fas fa-search-plus icons"></i>
            <p className="icon">Search School</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
            {" "}
            <i className="fas fa-sign-in-alt icons"></i>
            <p className="icon">Sign In</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-links" onClick={closeMobileMenu}>
            {" "}
            <i className="fas fa-user-plus icons"></i>
            <p className="icon">Sign Up</p>
          </Link>
        </li>
      </>
    );
  };
  const authenticatedNavBar = () => {
    return (
      <>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            {" "}
            <i className="fas fa-home icons"></i>
            <p className="icon">Home</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Info" className="nav-links" onClick={closeMobileMenu}>
            {" "}
            <i className="fas fa-info-circle icons"></i>
            <p className="icon">Information</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/searchschool"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            {" "}
            <i className="fas fa-search-plus icons"></i>
            <p className="icon">Search School</p>
          </Link>
        </li>

          {user.role === "school" ? (
            <li className="nav-item">
            <Link to="/myschools" className="nav-links" onClick={closeMobileMenu}>
              {" "}
              <i className="fas fa-heart icons"></i>
              <p className="icon">My Schools</p>
            </Link>
          </li>
          ) : null}

          {user.role === "user" ? (
            <li className="nav-item">
            <Link to="/myschools" className="nav-links" onClick={closeMobileMenu}>
              {" "}
              <i className="fas fa-heart icons"></i>
              <p className="icon">My Schools</p>
            </Link>
          </li>
          ) : null}
          
          {user.role === "admin" ? (
            <li className="nav-item">
            <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
              {" "}
              Admin
            </Link>
          </li>
        ) : null}

        {user.role === "school" || user.role === "admin" ? (
          <li className="nav-item">
            <Link
              to="/addschool"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              {" "}
              <i className="fas fa-plus-circle icons"></i>
              <p className="icon">Add School</p>
            </Link>
          </li>
        ) : null}

        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={onClickLogoutHandler}>
            <i className="fas fa-sign-out-alt icons"></i>
            <p className="icon">Logout</p>
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-icon">
          <div to="/" className="navbar-logo">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          <div className="menu-icon" onClick={iconMenu}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
