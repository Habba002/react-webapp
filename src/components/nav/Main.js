import { NavLink } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth";

import { removeFromLocalStorage } from "../../helpers/auth";

export default function Main() {
  const [auth, setAuth] = useContext(AuthContext);

  const logout = () => {
    removeFromLocalStorage("auth");
    setAuth(null);
  };

  return (
    <ul className="nav shadow mb-2 d-flex">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
      </li>
      {auth !== null && auth !== undefined ? (
        // <li className="nav-item">
        //   <NavLink className="nav-link" to="/login" onClick={logout}>
        //     Logout
        //   </NavLink>
        // </li>
        <li>
          <a className="dropdown-toggle" data-bs-toggle="dropdown">
            {auth?.user?.name}
          </a>
          <ul className="dropdown-menu">
          <li>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login" onClick={logout}>
                Logout
              </NavLink>
            </li>
          </ul>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}
