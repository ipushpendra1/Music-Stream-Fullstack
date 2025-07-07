import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'
import './Search.css'
import NowPlaying from '../components/NowPlaying'
import { setFilteredSongs, setCurrentSong, togglePlayPause, selectFilteredSongs, selectCurrentSong, selectIsPlaying } from '../redux/features/songSlice'
import { getPosterUrl, handleImageError } from '../utils/imageUtils'

import axios from 'axios'

const Search = () => {
    const dispatch = useDispatch();
    const filteredSongs = useSelector(selectFilteredSongs);
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);
    const [searchQuery, setSearchQuery] = useState('');

    // Clear search state when component mounts
    useEffect(() => {
        setSearchQuery('');
        dispatch(setFilteredSongs([]));
    }, [dispatch]);

    // Clear search state when component unmounts
    useEffect(() => {
        return () => {
            setSearchQuery('');
            dispatch(setFilteredSongs([]));
        };
    }, [dispatch]);

    const handleSearch = (e) => {
        const query = e.target.value;
        axios.get(`http://localhost:3000/song/search-songs?text=${query}`, {
            withCredentials: true
        }).then((res)=>{
            dispatch(setFilteredSongs(res.data.songs));
        })
        setSearchQuery(query);
    };

    const handlePlaySong = (song) => {
        dispatch(setCurrentSong(song));
    };

    return (
        <section className="search-section">
            <div className="search-header">
                <div className="search-header-top">
                    <h1>Search</h1>
                    <ThemeToggle />
                </div>
                <div className="search-bar">
                    <input type="text"   placeholder="Search for songs or artists..." 
                     value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
            </div>
            <div className="search-content">
                {filteredSongs.length > 0 ? (
                    <div className="song-list">
                        {filteredSongs.map(song => (
                            <div 
                                key={song._id} 
                                className="song-item" 
                                onClick={() => handlePlaySong(song)}
                            >
                                <img 
                                    src={getPosterUrl(song.poster)} 
                                    alt={song.title} 
                                    className="song-image" 
                                    onError={handleImageError}
                                />
                                <div className="song-details">
                                    <div className="song-title">{song.title}</div>
                                    <div className="song-artist">{song.artist}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : searchQuery ? (
                    <p>No results found for "{searchQuery}"</p>
                ) : (
                    <p>Type something to search for songs or artists</p>
                )}
            </div>

            {/* Now Playing component */}
            <NowPlaying 
                currentSong={currentSong} 
                isPlaying={isPlaying} 
                togglePlayPause={() => dispatch(togglePlayPause())} 
            />

            {/* Navigation bar */}
            <Navigation />
        </section>
    )
}

export default Search