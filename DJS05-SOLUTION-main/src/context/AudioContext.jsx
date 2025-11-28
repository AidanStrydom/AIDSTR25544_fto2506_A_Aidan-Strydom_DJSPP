import React, { createContext, useState, useRef, useEffect } from "react";

/**
 * Context for managing audio playback across the app.
 */
export const AudioContext = createContext();

/**
 * AudioProvider component.
 * 
 * Manages the audio player state and provides methods to control playback.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the context.
 * @returns {JSX.Element} Provider wrapping the application content.
 */
export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /**
   * Play an episode.
   * 
   * @param {Object} episode - Episode data
   * @param {string} episode.episodeTitle - Title of the episode
   * @param {string} episode.podcastTitle - Title of the podcast
   * @param {string} episode.audioFile - URL of the audio file
   * @param {string} episode.seasonImage - Image for the episode
   */
  const playEpisode = (episode) => {
    if (currentEpisode?.audioFile !== episode.audioFile) {
      audioRef.current.src = episode.audioFile;
      setCurrentEpisode(episode);
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      togglePlayPause();
    }
  };

  /**
   * Toggle play/pause.
   */
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  /**
   * Skip forward by seconds.
   * @param {number} seconds - Number of seconds to skip
   */
  const skipForward = (seconds = 10) => {
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + seconds,
      duration
    );
  };

  /**
   * Skip backward by seconds.
   * @param {number} seconds - Number of seconds to skip back
   */
  const skipBackward = (seconds = 10) => {
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - seconds,
      0
    );
  };

  /**
   * Seek to a specific time.
   * @param {number} time - Time in seconds
   */
  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Update current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const value = {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    playEpisode,
    togglePlayPause,
    skipForward,
    skipBackward,
    seekTo,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}