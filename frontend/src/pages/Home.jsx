import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'
import Navigation from '../components/Navigation'
import NowPlaying from '../components/NowPlaying'
import ThemeToggle from '../components/ThemeToggle'
import { setCurrentSong, togglePlayPause, selectSongs, selectCurrentSong, selectIsPlaying, setSongs } from '../redux/features/songSlice'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getPosterUrl, handleImageError } from '../utils/imageUtils'

const Home = () => {
    const dispatch = useDispatch();
    const songs = useSelector(selectSongs);
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);

    const handlePlaySong = (song) => {
        dispatch(setCurrentSong(song));
    };

    useEffect(() => {
        axios.get('http://localhost:3000/song/get-songs',{
            withCredentials: true,
        }).then((res)=>{
            if (res.data.songs && res.data.songs.length > 0) {
                dispatch(setSongs(res.data.songs));
            }
        }).catch((error) => {
            console.error('Error fetching songs:', error);
        })
    }, [dispatch])

    return (
        <section className="home-section">
            {/* Header with Stream title, search icon, and theme toggle */}
            <div className="app-header">
                <h1 className="app-title">Stream</h1>
                <div className="header-actions">
                    <Link to="/search" className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>

            {/* Song list */}
            <div className="song-list">
                {songs.map(song => (
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

            {/* Now Playing bar at the bottom */}
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

export default Home