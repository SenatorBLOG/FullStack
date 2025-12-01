import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              My Book Library
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Books
            </Link>
          </li>
          {/*          <li className="nav-item">
            <Link className="nav-link" to="updatebook">
              Update a Book
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="addbook">
              Add a Book
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
