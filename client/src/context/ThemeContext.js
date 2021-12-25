import { useState, createContext } from "react";
import { lightTheme as darkTheme, lightTheme } from "../styles/themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const localSt = localStorage.getItem("theme");

  // Detect device theme
  const [theme, setTheme] = useState(
    localSt
      ? JSON.parse(localSt).name === "dark"
        ? darkTheme
        : lightTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? darkTheme
      : lightTheme
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
