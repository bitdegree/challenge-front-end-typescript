import { NavLink } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  return (
    <div>
      <NavLink className="navLink" activeClassName="navLinkActive" to="/" exact>
        Home
      </NavLink>
      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        to="/dashboard"
        exact
      >
        Dashboard
      </NavLink>
    </div>
  );
};

export default Navigation;
