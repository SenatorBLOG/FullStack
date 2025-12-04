import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Movie Collection
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="addmovie">
              Add a New Movie
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
