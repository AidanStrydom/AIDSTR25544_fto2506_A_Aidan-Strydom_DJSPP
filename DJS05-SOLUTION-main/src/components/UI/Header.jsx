import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

export default function Header() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <header className={styles.appHeader}>
      <h1>
        <Link to="/">🎙️ Podcast App</Link>
      </h1>
      <nav className={styles.nav}>
        <ThemeToggle />
        <Link to="/favorites" className={styles.favoritesLink}>
          ❤️ Favorites
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}
