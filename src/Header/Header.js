import "./Header.css";
import logo from "../assets/symbol_split.png";
import { FaHome } from "react-icons/fa";
import { RiAccountBoxFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { HiMiniBanknotes } from "react-icons/hi2";
import { BiSolidDashboard } from "react-icons/bi";
import Cookies from "js-cookie";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = () => {
    console.log("Logging out...");
    Cookies.remove("userID");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="SplitUp Logo" className="logo-image" />
          </a>
          <h1>SplitUp!</h1>
        </div>

        {/* Hamburger icon */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation links */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <a href="/" style={{ display: "flex", alignItems: "center" }}>
                <FaHome style={{ marginRight: "8px" }} />
                Home
              </a>
            </li>
            <li>
              <a href="/transactionData" style={{ display: "flex", alignItems: "center" }}>
                <HiMiniBanknotes style={{ marginRight: "8px" }} />
                Bank Statement
              </a>
            </li>
            <li>
              <a href="/Dashboard" style={{ display: "flex", alignItems: "center" }}>
                <BiSolidDashboard style={{ marginRight: "8px" }} />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/ProfileTab" style={{ display: "flex", alignItems: "center" }}>
                <RiAccountBoxFill style={{ marginRight: "8px" }} />
                Profile
              </a>
            </li>
            <li>
              <a href="/login" onClick={handleChange} style={{ display: "flex", alignItems: "center" }}>
                <IoLogOut style={{ marginRight: "8px" }} />
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
