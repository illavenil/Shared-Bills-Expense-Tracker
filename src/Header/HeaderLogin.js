import "./Header.css"; // Make sure to create and import the CSS file
import logo from "../assets/symbol_split.png"; // Adjust the path as needed
const HeaderLogin = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="SplitUp Logo" className="logo-image" />
          </a>
          <h1>SplitUp!</h1>
        </div>
      </div>
    </header>
  );
};

HeaderLogin.displayName = "headerLogin";

export default HeaderLogin;
