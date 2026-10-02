import { useContext } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import ThemeContext from "../context/ThemeContext";

function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <div className="header-content">
        <div>
          <h1>Mini Movie Manager</h1>
        </div>
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          {darkMode ? (
            <>
              <CiLight /> Light
            </>
          ) : (
            <>
              <MdDarkMode /> Dark
            </>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
