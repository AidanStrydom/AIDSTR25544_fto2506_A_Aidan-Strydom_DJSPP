import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import { FavoritesContext } from "../../context/FavoritesContext";
import styles from "./AudioPlayer.module.css";

/**
 * AudioPlayer Component
 * 
 * Displays a fixed audio player bar at the bottom of the screen.
 * Shows currently playing episode, progress bar, playback controls, and favorite button.
 * 
 * @returns {JSX.Element|null} Audio player bar or null if no episode is playing
 */
export default function AudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    skipForward,
    skipBackward,
    seekTo,
  } = useContext(AudioContext);

  const { isFavorited, toggleFavorite } = useContext(FavoritesContext);

  if (!currentEpisode) return null;

  const isFav = isFavorited(
    currentEpisode.podcastId,
    currentEpisode.seasonNumber,
    currentEpisode.episodeNumber
  );

  /**
   * Format time in seconds to MM:SS format.
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /**
   * Handle progress bar click to seek.
   * @param {React.MouseEvent} e - Click event
   */
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  /**
   * Handle favorite toggle
   */
  const handleToggleFavorite = () => {
    toggleFavorite(currentEpisode);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerContent}>
        {/* Episode Info */}
        <div className={styles.episodeInfo}>
          <img
            src={currentEpisode.seasonImage}
            alt={currentEpisode.episodeTitle}
            className={styles.episodeImage}
          />
          <div className={styles.episodeText}>
            <p className={styles.episodeTitle}>{currentEpisode.episodeTitle}</p>
            <p className={styles.podcastTitle}>{currentEpisode.podcastTitle}</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            onClick={() => skipBackward(10)}
            aria-label="Skip backward 10 seconds"
          >
            ⏪
          </button>
          <button
            className={styles.playPauseButton}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            className={styles.controlButton}
            onClick={() => skipForward(10)}
            aria-label="Skip forward 10 seconds"
          >
            ⏩
          </button>
          <button
            className={`${styles.favoriteButtonPlayer} ${isFav ? styles.favorited : ''}`}
            onClick={handleToggleFavorite}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <div
            className={styles.progressBar}
            onClick={handleProgressClick}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}