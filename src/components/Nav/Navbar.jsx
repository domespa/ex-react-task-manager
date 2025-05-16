import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="list-navbar">
      <ul>
        <li>
          <NavLink to="/" className="nav-button">
            Lista Task
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" className="nav-button">
            Aggiungi Task
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
