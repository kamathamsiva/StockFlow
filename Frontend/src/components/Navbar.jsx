import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-4 sticky-top">
      <NavLink className="navbar-brand fw-bold" to="/dashboard">
        StockFlow
      </NavLink>

      <div className="ms-auto d-flex align-items-center gap-3">
        <NavLink className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink className="nav-link" to="/products">
          Products
        </NavLink>

        <NavLink className="nav-link" to="/settings">
          Settings
        </NavLink>

        <NavLink className="nav-link" to="/profile">
        Profile
        </NavLink>

        <button
          className="btn btn-outline-light btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;