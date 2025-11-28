import React, { createContext, useState, useEffect } from "react";

/**
 * Context for managing favorited episodes across the app.
 * Stores favorites in localStorage for persistence.
 */
export const FavoritesContext = createContext();

/**
 * FavoritesProvider component.
 * 
 * Manages the state of favorited episodes and provides methods to add/remove favorites.
 * Persists favorites to localStorage.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the context.
 * @returns {JSX.Element} Provider wrapping the application content.
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("podcastFavorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse favorites from localStorage:", err);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("podcastFavorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Add an episode to favorites.
   * 
   * @param {Object} episode - Episode object to favorite
   * @param {string} episode.episodeTitle - Title of the episode
   * @param {string} episode.episodeDescription - Description of the episode
   * @param {number} episode.episodeNumber - Episode number
   * @param {string} episode.podcastTitle - Title of the parent podcast
   * @param {string} episode.podcastId - ID of the parent podcast
   * @param {string} episode.seasonTitle - Title of the season
   * @param {number} episode.seasonNumber - Season number
   * @param {string} episode.seasonImage - Image URL for the season
   */
  const addFavorite = (episode) => {
    const favoriteId = `${episode.podcastId}-${episode.seasonNumber}-${episode.episodeNumber}`;
    
    // Check if already favorited
    if (favorites.some(fav => fav.id === favoriteId)) {
      return;
    }

    const newFavorite = {
      id: favoriteId,
      ...episode,
      addedAt: new Date().toISOString(),
    };

    setFavorites(prev => [...prev, newFavorite]);
  };

  /**
   * Remove an episode from favorites.
   * 
   * @param {string} favoriteId - Unique ID of the favorite to remove
   */
  const removeFavorite = (favoriteId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
  };

  /**
   * Check if an episode is favorited.
   * 
   * @param {string} podcastId - ID of the podcast
   * @param {number} seasonNumber - Season number
   * @param {number} episodeNumber - Episode number
   * @returns {boolean} True if the episode is favorited
   */
  const isFavorited = (podcastId, seasonNumber, episodeNumber) => {
    const favoriteId = `${podcastId}-${seasonNumber}-${episodeNumber}`;
    return favorites.some(fav => fav.id === favoriteId);
  };

  /**
   * Toggle favorite status of an episode.
   * 
   * @param {Object} episode - Episode object
   */
  const toggleFavorite = (episode) => {
    const favoriteId = `${episode.podcastId}-${episode.seasonNumber}-${episode.episodeNumber}`;
    
    if (isFavorited(episode.podcastId, episode.seasonNumber, episode.episodeNumber)) {
      removeFavorite(favoriteId);
    } else {
      addFavorite(episode);
    }
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}