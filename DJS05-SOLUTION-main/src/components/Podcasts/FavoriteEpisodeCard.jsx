import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import { AudioContext } from "../../context/AudioContext";
import { PodcastContext } from "../../context/PodcastContext";
import { formatDate } from "../../utils/formatDate";
import styles from "./FavoriteEpisodeCard.module.css";

/**
 * FavoriteEpisodeCard Component
 * 
 * Displays a favorited episode with its details and allows removal from favorites.
 * Also includes a play button to start playback.
 * 
 * @param {Object} props
 * @param {Object} props.favorite - The favorite episode object
 * @returns {JSX.Element} A card displaying the favorite episode
 */
export default function FavoriteEpisodeCard({ favorite }) {
  const { removeFavorite } = useContext(FavoritesContext);
  const { playEpisode, currentEpisode } = useContext(AudioContext);
  const { allPodcasts } = useContext(PodcastContext);
  const navigate = useNavigate();

  const handleNavigateToPodcast = () => {
    // Find the podcast to get its genres
    const podcast = allPodcasts.find(p => p.id === favorite.podcastId);
    const genres = podcast ? podcast.genres : [];
    
    navigate(`/show/${favorite.podcastId}`, { state: { genres } });
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFavorite(favorite.id);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    playEpisode(favorite);
  };

  const isCurrentlyPlaying = 
    currentEpisode?.podcastId === favorite.podcastId &&
    currentEpisode?.seasonNumber === favorite.seasonNumber &&
    currentEpisode?.episodeNumber === favorite.episodeNumber;

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
          <div className={styles.actions}>
            <button
              className={`${styles.playButton} ${isCurrentlyPlaying ? styles.playing : ''}`}
              onClick={handlePlay}
              aria-label="Play episode"
            >
              {isCurrentlyPlaying ? '⏸' : '▶'}
            </button>
            <button 
              className={styles.removeButton}
              onClick={handleRemove}
              aria-label="Remove from favorites"
            >
              ❤️
            </button>
          </div>
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