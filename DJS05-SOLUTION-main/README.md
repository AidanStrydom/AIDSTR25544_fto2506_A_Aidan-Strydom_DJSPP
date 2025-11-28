# DJSPP – React Podcast App with Routing, Detail Pages, Context State, Media Player and UI Enhancment 

This project is a **React-based podcast explorer** that builds upon DJS05 by adding **media player**, **favourites page**, **recommended section** and **theme toggle** and further improving the use of shared context state and component organization.

## Key Features

- **Routing (React Router DOM)**  
  Uses `react-router-dom` for navigation between pages:

  - `/` – Home page with search, filters, sorting, and pagination
  - `/show/:id` – Detailed view of a selected podcast, including episode listing

- **Podcast Context (Global State)**  
  Provides shared state using `PodcastContext`:

  - Manages full podcast dataset, filters, search, sort, pagination
  - Makes data accessible across pages

- **Search**

  - Case-insensitive search by podcast title
  - Updates results dynamically

- **Sort Options**

  - Default
  - Newest
  - Oldest
  - Title A → Z
  - Title Z → A

- **Genre Filter**

  - Filters podcasts by genre
  - Genre data loaded from static source

- **Pagination**

  - Dynamic per-page item calculation based on screen size
  - Defaults to 10 per page on smaller screens

- **Detail View**
  - Fetches full podcast data when visiting `/show/:id`
  - Displays title, image, description, genre tags, and seasons

- **Recommended Section**
  - Displays podcasts with the widest array of genres if there are no favourites
  - Displays podcasts with the same genres as favorited podcast episodes
  - Has pagination for ease of use

- **Favorites**
  - Can click to favorite any number of episodes
  - Seperate favoites page with full navigation

- **Theme Toggle**
  - Can switch between light and dark themes based on the users preferences

- **media Player**
  - Allows the user to listen to any podcast with the placeholder API
  - Allows for pausing, playing, fastforwarding and rewinding      

## Project Structure

```
/src
│
├── /api
│ └── fetchPata.js # Fetch podcasts and single podcast
│
├── /components
│ ├── Filters/ # SearchBar, SortSelect, GenreFilter
│ ├── Podcasts/ # PodcastCard, PodcastGrid, PodcastDetail, FavoriteEpisodeCard
│ └── UI/ # Header, Pagination, Loading, Error, GenreTags, AudioPlayer, RecommendedShows
│
├── /context
│ └── PodcastContext.jsx # Context provider for global state, AudioContext, FavoritesContext, ThemeContext
|
├── /pages
│ ├── Home.jsx # Home page with all podcasts and controls
│ └── ShowDetail.jsx # Detail view for a selected podcast, Favorites.jsx
│
├── /styles
│ └── \*.module.css # CSS Modules used throughout
│
├── App.jsx # Main app with routing
└── main.jsx # React entry point
└── data.js # Static genre ID to label mapping
```

## How It Works

- On initial load, all podcast data is fetched once via `PodcastProvider`.
- Components like `SearchBar`, `GenreFilter`, and `SortSelect` update shared context state.
- Filtered and sorted results are paginated and displayed in `PodcastGrid`.
- When a podcast card is clicked, the app navigates to `/show/:id`, fetching full podcast details.

## How to Run

1. Clone the repo or download the project files.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```
    npm run dev
   ```
4. Visit http://localhost:5173 in your browser.
