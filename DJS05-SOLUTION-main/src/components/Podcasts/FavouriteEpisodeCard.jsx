import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import { formatDate } from "../../utils/formatDate";
import styles from "./FavoriteEpisodeCard.module.css";

/**
 * FavoriteEpisodeCard Component
 * 
 * Displays a favorited episode with its details and allows removal from favorites.
 * 
 * @param {Object} props
 * @param {Object} props.favorite - The favorite episode object
 * @returns {JSX.Element} A card displaying the favorite episode
 */
export default function FavoriteEpisodeCard({ favorite }) {
  const { removeFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleNavigateToPodcast = () => {
    navigate(`/show/${favorite.podcastId}`);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFavorite(favorite.id);
  };

  return (
    <div className={styles.card}>
      <img 
        src={favorite.seasonImage} 
        alt={favorite.seasonTitle}
        className={styles.image}
        onClick={handleNavigateToPodcast}
      />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.episodeTitle} onClick={handleNavigateToPodcast}>
            {favorite.episodeTitle}
          </h3>
          <button 
            className={styles.removeButton}
            onClick={handleRemove}
            aria-label="Remove from favorites"
          >
            ❤️
          </button>
        </div>
        
        <p className={styles.podcastTitle} onClick={handleNavigateToPodcast}>
          {favorite.podcastTitle}
        </p>
        
        <p className={styles.seasonInfo}>
          Season {favorite.seasonNumber}, Episode {favorite.episodeNumber}
        </p>
        
        <p className={styles.description}>
          {favorite.episodeDescription}
        </p>
        
        <p className={styles.addedDate}>
          Added {formatDate(favorite.addedAt)}
        </p>
      </div>
    </div>
  );
}