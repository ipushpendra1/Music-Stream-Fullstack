import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_POSTER_URL } from '../../utils/imageUtils';

// Sample initial music data
const initialState = {
  songs: [
    {
      _id: 1,
      title: "Test Song 1",
      artist: "Test Artist",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      _id: 2,
      title: "Test Song 2", 
      artist: "Test Artist 2",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      _id: 3,
      title: "Sample Audio 3",
      artist: "Sample Artist",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      _id: 4,
      title: "Sample Audio 4",
      artist: "Sample Artist",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      _id: 5,
      title: "Sample Audio 5",
      artist: "Sample Artist",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      _id: 6,
      title: "Sample Audio 6",
      artist: "Sample Artist",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      _id: 7,
      title: "Sample Audio 7",
      artist: "Sample Artist",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      _id: 8,
      title: "Sample Audio 8",
      artist: "Sample Artist",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      _id: 9,
      title: "Sample Audio 9",
      artist: "Sample Artist",
      poster: DEFAULT_POSTER_URL,
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ],
  currentSong: {
    _id: 1,
    title: "Test Song 1",
    artist: "Test Artist",
    poster: DEFAULT_POSTER_URL,
    audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  filteredSongs: [] // For search functionality
};

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.currentTime = 0;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    nextSong: (state) => {
      const currentIndex = state.songs.findIndex(song => song._id === state.currentSong._id);
      const nextIndex = (currentIndex + 1) % state.songs.length;
      state.currentSong = state.songs[nextIndex];
      state.isPlaying = true;
      state.currentTime = 0;
    },
    previousSong: (state) => {
      const currentIndex = state.songs.findIndex(song => song._id === state.currentSong._id);
      const previousIndex = currentIndex === 0 ? state.songs.length - 1 : currentIndex - 1;
      state.currentSong = state.songs[previousIndex];
      state.isPlaying = true;
      state.currentTime = 0;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    seekTo: (state, action) => {
      state.currentTime = action.payload;
    },
    searchSongs: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query.trim() === '') {
        state.filteredSongs = [];
      } else {
        const filtered = state.songs.filter(
          song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        );
        // Ensure filtered songs have posters
        state.filteredSongs = filtered.map(song => ({
          ...song,
          poster: song.poster || DEFAULT_POSTER_URL
        }));
      }
    },
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    setSongs: (state, action) => {
      // Ensure all songs have a poster, use default if missing
      const songsWithDefaultPoster = action.payload?.map(song => ({
        ...song,
        poster: song.poster || DEFAULT_POSTER_URL
      })) || [];
      state.songs = songsWithDefaultPoster;
    },
    setFilteredSongs: (state, action) => {
      state.filteredSongs = action.payload;
    }
  },
});

export const { 
  setCurrentSong, 
  togglePlayPause, 
  nextSong, 
  previousSong, 
  setCurrentTime, 
  setDuration, 
  seekTo,
  addSong, 
  setSongs, 
  setFilteredSongs 
} = songSlice.actions;

export const selectSongs = (state) => state.songs.songs;
export const selectCurrentSong = (state) => state.songs.currentSong;
export const selectIsPlaying = (state) => state.songs.isPlaying;
export const selectCurrentTime = (state) => state.songs.currentTime;
export const selectDuration = (state) => state.songs.duration;
export const selectFilteredSongs = (state) => state.songs.filteredSongs;

export default songSlice.reducer;