import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="list-navbar">
        <ul>
          <li>
            <button>
              <NavLink to="/">Lista Task</NavLink>
            </button>
          </li>
          <li>
            <button>
              <NavLink to="/add">Aggiungi Task</NavLink>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
