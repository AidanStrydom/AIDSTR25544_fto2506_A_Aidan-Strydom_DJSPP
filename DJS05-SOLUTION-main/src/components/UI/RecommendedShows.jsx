import { useContext, useMemo, useState, useEffect } from "react";
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
 * Shows one row at a time with pagination.
 * 
 * @returns {JSX.Element} A section showing recommended podcasts
 */
export default function RecommendedShows() {
  const { allPodcasts } = useContext(PodcastContext);
  const { favorites } = useContext(FavoritesContext);
  const [page, setPage] = useState(1);
  const [itemsPerRow, setItemsPerRow] = useState(4);

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

      return scoredPodcasts.slice(0, 20).map(item => item.podcast);
    }

    // If no favorites, show podcasts with most genres
    const sortedByGenreCount = [...allPodcasts]
      .sort((a, b) => b.genres.length - a.genres.length)
      .slice(0, 20);

    return sortedByGenreCount;
  }, [allPodcasts, favorites]);

  /**
   * Calculate items per row based on screen width.
   */
  useEffect(() => {
    const calculateItemsPerRow = () => {
      const screenW = window.innerWidth;
      const cardWidth = 260;
      const gap = 16; // 1rem gap
      const padding = 32; // 2rem total padding (1rem each side)
      
      const availableWidth = screenW - padding;
      const columns = Math.max(1, Math.floor((availableWidth + gap) / (cardWidth + gap)));
      
      setItemsPerRow(columns);
    };

    calculateItemsPerRow();
    window.addEventListener("resize", calculateItemsPerRow);
    return () => window.removeEventListener("resize", calculateItemsPerRow);
  }, []);

  // Reset to page 1 when recommendations change
  useEffect(() => {
    setPage(1);
  }, [recommendations]);

  if (recommendations.length === 0) return null;

  // Calculate items per page (1 row only)
  const itemsPerPage = itemsPerRow;
  const totalPages = Math.max(1, Math.ceil(recommendations.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const paged = recommendations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }}>
        {paged.map(podcast => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`${styles.pageButton} ${p === currentPage ? styles.active : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}