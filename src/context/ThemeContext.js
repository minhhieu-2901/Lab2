import { createContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode((current) => !current);

  const theme = {
    darkMode,
    toggleTheme,
    pageBackground: darkMode ? "#222" : "#f5f5f5",
    textColor: darkMode ? "white" : "black",
    fieldBackground: darkMode ? "#333" : "white",
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContext;
