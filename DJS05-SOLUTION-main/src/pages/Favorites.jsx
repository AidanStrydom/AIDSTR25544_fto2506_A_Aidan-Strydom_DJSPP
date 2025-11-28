import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import FavoriteEpisodeCard from "../components/Podcasts/FavoriteEpisodeCard";
import styles from "./Favorites.module.css";

/**
 * Favorites page component.
 * 
 * Displays all episodes that the user has marked as favorites.
 * Shows a message if no favorites exist.
 * 
 * @returns {JSX.Element} The favorites page with all favorited episodes
 */
export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <div className={styles.headerContainer}>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          ← Home
        </button>
        <div className={styles.header}>
          <h1>My Favorite Episodes</h1>
          <p className={styles.count}>
            {favorites.length} {favorites.length === 1 ? 'episode' : 'episodes'}
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon}>❤️</p>
          <p className={styles.emptyText}>No favorite episodes yet</p>
          <p className={styles.emptySubtext}>
            Start exploring podcasts and mark episodes as favorites to see them here!
          </p>
        </div>
      ) : (
        <div className={styles.favoritesList}>
          {favorites.map((favorite) => (
            <FavoriteEpisodeCard key={favorite.id} favorite={favorite} />
          ))}
        </div>
      )}
    </main>
  );
}