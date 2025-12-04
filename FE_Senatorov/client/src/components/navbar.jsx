import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Book Collection
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addBook">
              Add a New Book
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
