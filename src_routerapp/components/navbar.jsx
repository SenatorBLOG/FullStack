import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    // Prevent default to stop Link from triggering navigation
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Shopping
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only"></span>
            </Link>
          </li>

          <li className="nav-item dropdown">
            {/* Prevent default navigation and toggle dropdown */}
            <Link
              className="nav-link dropdown-toggle"
              to="/about"
              onClick={toggleDropdown}
              role="button"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"}
            >
              About
            </Link>

            {/* Conditionally render dropdown menu */}
            <div
              className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
              aria-labelledby="navbarDropdown"
            >
              <Link className="dropdown-item" to="/about">
                Company
              </Link>
              <Link className="dropdown-item" to="/about/history">
                History
              </Link>
              <Link className="dropdown-item" to="/about/services">
                Services
              </Link>
              <Link className="dropdown-item" to="/about/locations">
                Locations
              </Link>
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/events">
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
