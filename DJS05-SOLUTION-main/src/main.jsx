import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AudioProvider } from "./context/AudioContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>
          <AudioProvider>
            <App />
          </AudioProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
