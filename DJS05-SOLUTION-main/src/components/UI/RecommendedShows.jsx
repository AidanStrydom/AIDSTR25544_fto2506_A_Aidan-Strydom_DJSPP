import { useContext, useMemo } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import { FavoritesContext } from "../../context/FavoritesContext";
import PodcastCard from "../Podcasts/PodcastCard";
import styles from "./RecommendedShows.module.css";

/**
 * RecommendedShows Component
 * 
 * Displays recommended podcasts based on:
 * - Genres from favorited episodes (if user has favorites)
 * - Podcasts with most genres (if user has no favorites)
 * 
 * @returns {JSX.Element} A section showing recommended podcasts
 */
export default function RecommendedShows() {
  const { allPodcasts } = useContext(PodcastContext);
  const { favorites } = useContext(FavoritesContext);

  const recommendations = useMemo(() => {
    if (!allPodcasts || allPodcasts.length === 0) return [];

    // If user has favorites, recommend based on genres
    if (favorites.length > 0) {
      // Get unique podcast IDs from favorites to exclude them
      const favoritedPodcastIds = new Set(
        favorites.map(fav => fav.podcastId)
      );

      // Extract genres from favorited podcasts
      const favoriteGenres = new Set();
      favorites.forEach(fav => {
        const podcast = allPodcasts.find(p => p.id === fav.podcastId);
        if (podcast && podcast.genres) {
          podcast.genres.forEach(genre => favoriteGenres.add(genre));
        }
      });

      // Score podcasts based on matching genres
      const scoredPodcasts = allPodcasts
        .filter(podcast => !favoritedPodcastIds.has(podcast.id))
        .map(podcast => {
          const matchingGenres = podcast.genres.filter(g => 
            favoriteGenres.has(g)
          ).length;
          return { podcast, score: matchingGenres };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

      return scoredPodcasts.slice(0, 10).map(item => item.podcast);
    }

    // If no favorites, show podcasts with most genres
    const sortedByGenreCount = [...allPodcasts]
      .sort((a, b) => b.genres.length - a.genres.length)
      .slice(0, 10);

    return sortedByGenreCount;
  }, [allPodcasts, favorites]);

  if (recommendations.length === 0) return null;

  const title = favorites.length > 0 
    ? "Recommended For You" 
    : "Most Diverse Podcasts";

  const subtitle = favorites.length > 0
    ? "Based on your favorite episodes"
    : "Podcasts with the most genre variety";

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.grid}>
        {recommendations.map(podcast => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </section>
  );
}