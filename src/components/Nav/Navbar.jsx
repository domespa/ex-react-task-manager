import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="list-navbar">
        <ul>
          <li>
            <NavLink to="/">Lista Task</NavLink>
          </li>
          <li>
            <NavLink to="/add">Aggiungi Task</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
