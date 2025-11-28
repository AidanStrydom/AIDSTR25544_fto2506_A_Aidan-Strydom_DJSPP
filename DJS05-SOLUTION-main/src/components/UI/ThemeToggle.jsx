import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

/**
 * ThemeToggle Component
 * 
 * Renders a button to toggle between light and dark themes.
 * 
 * @returns {JSX.Element} A theme toggle button
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}