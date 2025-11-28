import React, { createContext, useState, useEffect } from "react";

/**
 * Context for managing app theme (light/dark mode).
 * Stores theme preference in localStorage for persistence.
 */
export const ThemeContext = createContext();

/**
 * ThemeProvider component.
 * 
 * Manages the theme state and provides methods to toggle between light and dark mode.
 * Applies theme class to document body and persists preference to localStorage.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the context.
 * @returns {JSX.Element} Provider wrapping the application content.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("podcastTheme");
    if (stored) {
      setTheme(stored);
    }
  }, []);

  // Apply theme to document body and save to localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("podcastTheme", theme);
  }, [theme]);

  /**
   * Toggle between light and dark theme.
   */
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}