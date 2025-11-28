import { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import FavoriteEpisodeCard from "../components/Podcasts/FavoriteEpisodeCard";
import { SearchBar, SortSelect, GenreFilter } from "../components";
import { genres } from "../data";
import styles from "./Favorites.module.css";

/**
 * Favorites page component.
 * 
 * Displays all episodes that the user has marked as favorites.
 * Includes search, filter, and sort functionality.
 * Shows a message if no favorites exist.
 * 
 * @returns {JSX.Element} The favorites page with all favorited episodes
 */
export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date-desc");
  const [genre, setGenre] = useState("all");

  /**
   * Filter and sort favorites based on user selections
   */
  const filteredFavorites = useMemo(() => {
    let filtered = [...favorites];

    // Apply search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        fav => 
          fav.episodeTitle.toLowerCase().includes(q) ||
          fav.podcastTitle.toLowerCase().includes(q)
      );
    }

    // Apply genre filter (need to find podcast and check its genres)
    if (genre !== "all") {
      // This would require access to podcast data
      // For now, we'll skip genre filtering on favorites
      // Or you could store genres in the favorite object when saving
    }

    // Apply sorting
    switch (sortKey) {
      case "title-asc":
        filtered.sort((a, b) => a.episodeTitle.localeCompare(b.episodeTitle));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.episodeTitle.localeCompare(a.episodeTitle));
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [favorites, search, sortKey, genre]);

  return (
    <main className={styles.main}>
      <div className={styles.headerContainer}>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          ← Home
        </button>
        <div className={styles.header}>
          <h1>My Favorite Episodes</h1>
          <p className={styles.count}>
            {filteredFavorites.length} {filteredFavorites.length === 1 ? 'episode' : 'episodes'}
            {filteredFavorites.length !== favorites.length && ` (${favorites.length} total)`}
          </p>
        </div>
      </div>

      {favorites.length > 0 && (
        <section className={styles.controls}>
          <input
            type="search"
            placeholder="Search favorite episodes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <select
            className={styles.select}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="date-desc">Newest Added</option>
            <option value="date-asc">Oldest Added</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </section>
      )}

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon}>❤️</p>
          <p className={styles.emptyText}>No favorite episodes yet</p>
          <p className={styles.emptySubtext}>
            Start exploring podcasts and mark episodes as favorites to see them here!
          </p>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon}>🔍</p>
          <p className={styles.emptyText}>No matches found</p>
          <p className={styles.emptySubtext}>
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className={styles.favoritesList}>
          {filteredFavorites.map((favorite) => (
            <FavoriteEpisodeCard key={favorite.id} favorite={favorite} />
          ))}
        </div>
      )}
    </main>
  );
}