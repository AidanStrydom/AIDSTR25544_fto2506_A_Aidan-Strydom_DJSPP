import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favorites from "./pages/Favorites";
import AudioPlayer from "./components/UI/AudioPlayer";
import { PodcastProvider } from "./context/PodcastContext";

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in the `PodcastProvider` context for global state.
 * - Includes the `Header` component, displayed on all pages.
 * - Includes the `AudioPlayer` component, fixed at the bottom.
 * - Defines client-side routes using React Router:
 *    - "/" renders the `Home` page
 *    - "/show/:id" renders the `ShowDetail` page for a specific podcast
 *    - "/favorites" renders the `Favorites` page with favorited episodes
 *
 * @returns {JSX.Element} The application component with routing and context.
 */
export default function App() {
  return (
    <>
      <Header />
      <PodcastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/show/:id`} element={<ShowDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </PodcastProvider>
      <AudioPlayer />
    </>
  );
}